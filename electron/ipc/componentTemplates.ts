import { ipcMain } from 'electron'
import { TemplateRegistryService } from '../services/TemplateRegistryService'
import type { ComponentCodeDefinition, ComponentTemplate } from '../../types/component-code.types'
export function registerComponentTemplateIPCHandlers() { const service = new TemplateRegistryService(); ipcMain.handle('components:template', (_, id: string, framework: ComponentTemplate['framework']) => service.getTemplate(id, framework)); ipcMain.handle('components:metadata', (_, id: string) => service.getMetadata(id)); ipcMain.handle('components:dependencies', (_, id: string) => service.getDependencies(id)); ipcMain.handle('components:register', (_, definition: ComponentCodeDefinition) => service.register(definition)) }
