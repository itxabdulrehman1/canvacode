import { ipcMain } from 'electron'
import { ASTService } from '../services/ASTService'
import type { CanvasDocument } from '../../types/canvas-engine.types'
export function registerASTIPCHandlers() { const service = new ASTService(); ipcMain.handle('ast:generate', (_, id: string, document: CanvasDocument) => service.generate(id, document)); ipcMain.handle('ast:load', (_, id: string) => service.load(id)); ipcMain.handle('ast:validate', (_, id: string, document: CanvasDocument) => service.validate(id, document)); ipcMain.handle('ast:serialize', (_, id: string) => service.serialize(id)) }
