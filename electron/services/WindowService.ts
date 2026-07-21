import { BrowserWindow } from 'electron'
import { LoggerService } from './LoggerService'

export class WindowService {
  private static instance: WindowService
  private mainWindow: BrowserWindow | null = null
  private logger: LoggerService

  private constructor() {
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): WindowService {
    if (!WindowService.instance) {
      WindowService.instance = new WindowService()
    }
    return WindowService.instance
  }

  public setMainWindow(window: BrowserWindow) {
    this.mainWindow = window
  }

  public getMainWindow(): BrowserWindow | null {
    return this.mainWindow
  }

  public minimize() {
    if (this.mainWindow) {
      this.logger.debug('Minimizing main window', 'WindowService')
      this.mainWindow.minimize()
    }
  }

  public maximize() {
    if (this.mainWindow) {
      this.logger.debug('Maximizing main window', 'WindowService')
      if (this.mainWindow.isMaximized()) {
        this.mainWindow.unmaximize()
      } else {
        this.mainWindow.maximize()
      }
    }
  }

  public close() {
    if (this.mainWindow) {
      this.logger.info('Closing main window', 'WindowService')
      this.mainWindow.close()
    }
  }
}
