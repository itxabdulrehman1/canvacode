import { drizzle } from 'drizzle-orm/better-sqlite3'
import { getDatabaseConnection, closeDatabaseConnection } from '../db/connection'
import { LoggerService } from './LoggerService'

export class DatabaseService {
  private static instance: DatabaseService
  private logger: LoggerService

  private constructor() {
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  public initialize(): ReturnType<typeof drizzle> {
    this.logger.info('Initializing Database Service', 'DatabaseService')
    return getDatabaseConnection()
  }

  public shutdown(): void {
    this.logger.info('Shutting down Database Service', 'DatabaseService')
    closeDatabaseConnection()
  }
}
