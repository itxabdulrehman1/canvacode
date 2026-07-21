import { ipcMain } from 'electron'
import { CompilerService } from '../services/CompilerService'

export function registerCompilerIPCHandlers() {
  const compilerService = CompilerService.getInstance()

  ipcMain.handle('compiler:compile', (_, path: string) => {
    return compilerService.compileProject(path)
  })
}
