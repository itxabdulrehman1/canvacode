import { ipcMain } from 'electron'
import { SettingsService } from '../services/SettingsService'

export function registerSettingsIPCHandlers() {
  const settingsService = SettingsService.getInstance()

  ipcMain.handle('settings:get', () => {
    return settingsService.getSettings()
  })

  ipcMain.handle('settings:update', (_, settings) => {
    return settingsService.updateSettings(settings)
  })

  ipcMain.handle('settings:getRecent', () => {
    return settingsService.getRecentProjects()
  })
}
