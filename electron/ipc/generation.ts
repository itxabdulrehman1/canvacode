import { ipcMain } from 'electron'
import { CodeGenerationEngine } from '../services/CodeGenerationEngine'
import type { CompilationPlan } from '../../types/compilation.types'
import { CanvasService } from '../services/CanvasService'
import { ASTService } from '../services/ASTService'
import { CompilerOrchestrator } from '../services/CompilerOrchestrator'
export function registerGenerationIPCHandlers() { const engine = new CodeGenerationEngine(); const canvas = new CanvasService(); const ast = new ASTService(); const compiler = new CompilerOrchestrator(); ipcMain.handle('generation:run', (_, plan: CompilationPlan) => engine.generate(plan)); ipcMain.handle('generation:project', async (_, projectId: string) => { const document = canvas.load(projectId); ast.generate(projectId, document); const compilation = await compiler.compile(projectId); if (compilation.validation.errors.length) throw new Error(`Cannot generate: ${compilation.validation.errors.join('; ')}`); return engine.generate(compilation.plan) }); ipcMain.handle('generation:load', (_, id: string) => engine.load(id)) }
