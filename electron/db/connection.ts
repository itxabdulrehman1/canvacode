import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import * as path from 'path'
import * as fs from 'fs'
import { EnvironmentService } from '../config/EnvironmentService'
import { LoggerService } from '../services/LoggerService'
import { DatabaseError } from '../errors/AppError'

let dbInstance: ReturnType<typeof drizzle> | null = null
let sqliteInstance: Database.Database | null = null

export function getDatabaseConnection() {
  if (dbInstance) return dbInstance

  const envService = EnvironmentService.getInstance()
  const logger = LoggerService.getInstance()
  const dbPath = envService.getDatabasePath()

  logger.info(`Initializing SQLite Database at: ${dbPath}`, 'Database')

  try {
    // Ensure parent directory exists
    const dbDir = path.dirname(dbPath)
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }

    sqliteInstance = new Database(dbPath, {
      fileMustExist: false,
    })

    // Enable WAL mode for performance
    sqliteInstance.pragma('journal_mode = WAL')
    sqliteInstance.pragma('foreign_keys = ON')
    sqliteInstance.exec(`
      CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, name TEXT NOT NULL, framework TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS canvas_nodes (id TEXT PRIMARY KEY, project_id TEXT NOT NULL, type TEXT NOT NULL, label TEXT NOT NULL, position_x REAL NOT NULL, position_y REAL NOT NULL, width REAL NOT NULL, height REAL NOT NULL, properties TEXT NOT NULL, children TEXT NOT NULL, locked INTEGER NOT NULL DEFAULT 0, selected INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE);
      CREATE TABLE IF NOT EXISTS canvas_edges (id TEXT PRIMARY KEY, project_id TEXT NOT NULL, source TEXT NOT NULL, target TEXT NOT NULL, data TEXT NOT NULL DEFAULT '{}', created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE);
      CREATE TABLE IF NOT EXISTS canvas_viewports (project_id TEXT PRIMARY KEY, x REAL NOT NULL, y REAL NOT NULL, zoom REAL NOT NULL, FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE);
      CREATE TABLE IF NOT EXISTS component_registry (id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL, metadata TEXT NOT NULL, version TEXT NOT NULL, updated_at INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS component_templates (component_id TEXT NOT NULL, framework TEXT NOT NULL, export_name TEXT NOT NULL, imports TEXT NOT NULL, dependencies TEXT NOT NULL, code TEXT NOT NULL, property_mapping TEXT NOT NULL, PRIMARY KEY (component_id, framework), FOREIGN KEY (component_id) REFERENCES component_registry(id) ON DELETE CASCADE);
      CREATE TABLE IF NOT EXISTS component_dependencies (component_id TEXT NOT NULL, dependency TEXT NOT NULL, PRIMARY KEY (component_id, dependency), FOREIGN KEY (component_id) REFERENCES component_registry(id) ON DELETE CASCADE);
      CREATE TABLE IF NOT EXISTS component_versions (component_id TEXT NOT NULL, version TEXT NOT NULL, metadata TEXT NOT NULL, created_at INTEGER NOT NULL, PRIMARY KEY (component_id, version), FOREIGN KEY (component_id) REFERENCES component_registry(id) ON DELETE CASCADE);
      CREATE TABLE IF NOT EXISTS project_asts (project_id TEXT PRIMARY KEY, ast TEXT NOT NULL, validation TEXT NOT NULL, updated_at INTEGER NOT NULL, FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE);
      CREATE TABLE IF NOT EXISTS project_ast_versions (project_id TEXT NOT NULL, version INTEGER NOT NULL, ast TEXT NOT NULL, validation TEXT NOT NULL, created_at INTEGER NOT NULL, PRIMARY KEY (project_id, version), FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE);
    `)
    const canvasColumns = sqliteInstance.prepare('PRAGMA table_info(canvas_nodes)').all() as { name: string }[]
    if (!canvasColumns.some((column) => column.name === 'parent_id')) sqliteInstance.exec('ALTER TABLE canvas_nodes ADD COLUMN parent_id TEXT')
    if (!canvasColumns.some((column) => column.name === 'z_index')) sqliteInstance.exec('ALTER TABLE canvas_nodes ADD COLUMN z_index INTEGER NOT NULL DEFAULT 0')

    dbInstance = drizzle(sqliteInstance)

    // Run migrations programmatically
    runMigrations()

    return dbInstance
  } catch (error) {
    logger.error('Failed to initialize database connection', error, 'Database')
    throw new DatabaseError('Failed to connect to database', error)
  }
}

export function closeDatabaseConnection() {
  if (sqliteInstance) {
    const logger = LoggerService.getInstance()
    logger.info('Closing database connection', 'Database')
    sqliteInstance.close()
    sqliteInstance = null
    dbInstance = null
  }
}

export function getSqliteConnection(): Database.Database {
  getDatabaseConnection()
  if (!sqliteInstance) throw new DatabaseError('SQLite connection is unavailable')
  return sqliteInstance
}

function runMigrations() {
  const logger = LoggerService.getInstance()
  if (!dbInstance) return

  logger.info('Running database migrations...', 'Database')
  try {
    // Locate the migrations folder. In development it's under electron/db/migrations.
    // In production, we'll pack it or place it next to the app.
    let migrationsPath = path.join(__dirname, 'migrations')
    if (!fs.existsSync(migrationsPath)) {
      // Fallback relative to project root or resources path
      migrationsPath = path.join(process.cwd(), 'electron', 'db', 'migrations')
    }

    if (!fs.existsSync(migrationsPath)) {
      logger.warn(`Migrations folder not found at: ${migrationsPath}. Skipping migrations.`, 'Database')
      return
    }

    migrate(dbInstance, { migrationsFolder: migrationsPath })
    logger.info('Migrations completed successfully', 'Database')
  } catch (error) {
    logger.error('Database migration failed', error, 'Database')
    throw new DatabaseError('Database migration failed', error)
  }
}
