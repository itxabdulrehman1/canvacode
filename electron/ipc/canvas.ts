import { ipcMain } from 'electron'
import { CanvasService } from '../services/CanvasService'
import type { CanvasDocument } from '../../types/canvas-engine.types'
export function registerCanvasIPCHandlers() { const service = new CanvasService(); ipcMain.handle('canvas:load', (_, projectId: string) => service.load(projectId)); ipcMain.handle('canvas:save', (_, projectId: string, document: CanvasDocument) => service.save(projectId, document)) }
