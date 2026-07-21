import { ipcMain } from 'electron'
import { ProjectService } from '../services/ProjectService'

export function registerProjectIPCHandlers() {
  const projectService = ProjectService.getInstance()

  ipcMain.handle('projects:list', () => {
    return projectService.listProjects()
  })

  ipcMain.handle('projects:create', (_, name: string, framework: string) => {
    return projectService.createProject(name, framework)
  })

  ipcMain.handle('projects:open', (_, path: string) => {
    return projectService.openProject(path)
  })
}
