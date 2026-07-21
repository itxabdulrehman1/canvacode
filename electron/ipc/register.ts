import { registerWindowIPCHandlers } from './window'
import { registerSettingsIPCHandlers } from './settings'
import { registerProjectIPCHandlers } from './project'
import { registerStorageIPCHandlers } from './storage'
import { registerCompilerIPCHandlers } from './compiler'
import { registerAuthIPCHandlers } from './auth'
import { registerCanvasIPCHandlers } from './canvas'
import { registerComponentTemplateIPCHandlers } from './componentTemplates'
import { registerASTIPCHandlers } from './ast'
import { registerAIIPCHandlers } from './ai'
import { registerCompilationPlanIPCHandlers } from './compilationPlan'
import { registerGenerationIPCHandlers } from './generation'
import { registerBlueprintIPCHandlers } from './blueprint'
import { registerWorkspaceIPCHandlers } from './workspace'
import { LoggerService } from '../services/LoggerService'

export function registerAllIPCHandlers() {
  const logger = LoggerService.getInstance()
  logger.info('Registering all Electron IPC handlers', 'IPC')

  registerWindowIPCHandlers()
  registerSettingsIPCHandlers()
  registerProjectIPCHandlers()
  registerStorageIPCHandlers()
  registerCompilerIPCHandlers()
  registerAuthIPCHandlers()
  registerCanvasIPCHandlers()
  registerComponentTemplateIPCHandlers()
  registerASTIPCHandlers()
  registerAIIPCHandlers()
  registerCompilationPlanIPCHandlers()
  registerGenerationIPCHandlers()
  registerBlueprintIPCHandlers()
  registerWorkspaceIPCHandlers()

  logger.info('IPC handler registration complete', 'IPC')
}
