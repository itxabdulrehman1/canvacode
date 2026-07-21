import { ipcMain } from 'electron'
import { BlueprintService } from '../services/BlueprintService'
import type { BackendBlueprint } from '../../types/backend-blueprint.types'
import type { GeneratedFile } from '../../types/generation.types'
export function registerBlueprintIPCHandlers() { const service = new BlueprintService(); ipcMain.handle('blueprint:build', (_, projectId: string, files: GeneratedFile[]) => service.save(service.build(projectId, files))); ipcMain.handle('blueprint:load', (_, projectId: string) => service.load(projectId)); ipcMain.handle('blueprint:save', (_, blueprint: BackendBlueprint) => service.save(blueprint)); ipcMain.handle('blueprint:lock', (_, projectId: string, nodeId: string, locked: boolean) => service.lock(projectId, nodeId, locked)) }
