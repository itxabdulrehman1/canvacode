import { ipcMain } from 'electron'
import { StorageService } from '../services/StorageService'

export function registerStorageIPCHandlers() {
  const storageService = StorageService.getInstance()

  ipcMain.handle('storage:read', (_, path: string) => {
    return storageService.readTextFile(path)
  })

  ipcMain.handle('storage:write', (_, path: string, content: string) => {
    storageService.writeTextFile(path, content)
  })

  ipcMain.handle('storage:delete', (_, path: string) => {
    storageService.deleteFile(path)
  })

  ipcMain.handle('storage:readdir', (_, path: string) => {
    return storageService.getDirectoryContents(path)
  })
}
