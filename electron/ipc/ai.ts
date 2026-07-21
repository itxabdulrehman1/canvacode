import { ipcMain } from 'electron'
import { AIManager } from '../services/AIManager'
import type { AIProviderId, AIRequest } from '../../types/ai.types'
export function registerAIIPCHandlers() { const manager = new AIManager(); ipcMain.handle('ai:settings', () => manager.settings()); ipcMain.handle('ai:models', (_, provider: AIProviderId) => manager.models(provider)); ipcMain.handle('ai:save', (_, provider: AIProviderId, model: string, key?: string) => manager.save(provider, model, key)); ipcMain.handle('ai:removeKey', () => manager.removeKey()); ipcMain.handle('ai:test', () => manager.test()); ipcMain.handle('ai:request', (_, request: AIRequest) => manager.request(request)); ipcMain.handle('ai:cancel', (_, id: string) => manager.cancel(id)) }
