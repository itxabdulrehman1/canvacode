import { ipcMain } from 'electron'
import { WindowService } from '../services/WindowService'

export function registerWindowIPCHandlers() {
  const windowService = WindowService.getInstance()

  ipcMain.handle('window:minimize', () => {
    windowService.minimize()
  })

  ipcMain.handle('window:maximize', () => {
    windowService.maximize()
  })

  ipcMain.handle('window:close', () => {
    windowService.close()
  })
}
