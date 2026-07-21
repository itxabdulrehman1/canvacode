import { ipcMain } from 'electron'
import { CompilerOrchestrator } from '../services/CompilerOrchestrator'
export function registerCompilationPlanIPCHandlers() { const service = new CompilerOrchestrator(); ipcMain.handle('compilation:run', (_, projectId: string) => service.compile(projectId)); ipcMain.handle('compilation:cancel', (_, projectId: string) => service.cancel(projectId)); ipcMain.handle('compilation:status', (_, projectId: string) => service.getStatus(projectId)); ipcMain.handle('compilation:load', (_, id: string) => service.load(id)) }
