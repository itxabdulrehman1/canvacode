import { app, BrowserWindow } from 'electron'
import { EnvironmentService } from './config/EnvironmentService'
import { LoggerService } from './services/LoggerService'
import { DatabaseService } from './services/DatabaseService'
import { registerAllIPCHandlers } from './ipc/register'
import { createMainWindow } from './window'
import { setupApplicationMenu } from './menu'

// Handle single instance lock
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
  process.exit(0)
}

// Initialise core singletons
const envService = EnvironmentService.getInstance()
const logger = LoggerService.getInstance()
const dbService = DatabaseService.getInstance()

logger.info(`Starting CanvasCode main process in: ${envService.getEnv()} mode`, 'Main')

// Boot sequence
app.whenReady().then(() => {
  // 1. Initialize SQLite Database & migrations
  try {
    dbService.initialize()
  } catch (error) {
    logger.error('Critical database initialization failure', error, 'Main')
  }

  // 2. Register IPC Dispatchers
  registerAllIPCHandlers()

  // 3. Setup Menu
  setupApplicationMenu()

  // 4. Mount Main window
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

// Single instance redirect handler
app.on('second-instance', () => {
  const mainWindow = BrowserWindow.getAllWindows()[0]
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

// Safe termination handlers
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    dbService.shutdown()
    app.quit()
  }
})

app.on('will-quit', () => {
  dbService.shutdown()
})
