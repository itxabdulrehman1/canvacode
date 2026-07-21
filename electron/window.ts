import { BrowserWindow, shell } from 'electron'
import * as path from 'path'
import { EnvironmentService } from './config/EnvironmentService'
import { SettingsService } from './services/SettingsService'
import { LoggerService } from './services/LoggerService'
import { WindowService } from './services/WindowService'

export function createMainWindow(): BrowserWindow {
  const envService = EnvironmentService.getInstance()
  const settingsService = SettingsService.getInstance()
  const logger = LoggerService.getInstance()
  const windowService = WindowService.getInstance()

  const state = settingsService.getWindowState()

  logger.info('Creating main BrowserWindow', 'Window')

  const mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 800,
    minHeight: 600,
    title: 'CanvasCode',
    frame: false, // Custom Electron Titlebar friendly
    titleBarStyle: 'hidden',
    backgroundColor: '#141313', // Soft slate
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  })

  windowService.setMainWindow(mainWindow)

  if (state.isMaximized) {
    mainWindow.maximize()
  }

  // Load target URL: Dev Server vs Prod Build
  if (envService.isDev()) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    // In production, we load the exported static build
    const indexPath = path.join(__dirname, '../out/index.html')
    mainWindow.loadFile(indexPath)
  }

  // Window State Persistence
  const saveState = () => {
    try {
      const bounds = mainWindow.getBounds()
      settingsService.saveWindowState(
        bounds.width,
        bounds.height,
        bounds.x,
        bounds.y,
        mainWindow.isMaximized()
      )
    } catch (err) {
      logger.error('Failed to save window state', err, 'Window')
    }
  }

  mainWindow.on('resize', saveState)
  mainWindow.on('move', saveState)
  mainWindow.on('close', saveState)

  // CSP Header Configuration
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' ws://localhost:3000 ws://localhost:3001;",
        ],
      },
    })
  })

  // Open external links in default OS browser
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.once('ready-to-show', () => {
    logger.info('MainWindow ready-to-show', 'Window')
    mainWindow.show()
  })

  return mainWindow
}
