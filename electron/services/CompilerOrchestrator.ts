import { ASTService } from './ASTService'
import { getSqliteConnection } from '../db/connection'
import type { CompilationPlan, CompilationResult } from '../../types/compilation.types'

export class CompilerOrchestrator {
  private ast = new ASTService()
  private status = new Map<string, { stage: string; logs: string[]; cancelled: boolean }>()
  async compile(projectId: string): Promise<CompilationResult> {
    const run = { stage: 'loading AST', logs: ['Loading project AST'], cancelled: false }; this.status.set(projectId, run)
    const stored = this.ast.load(projectId); if (!stored) throw new Error('No AST is available for this project')
    const nodes = Object.values(stored.ast.nodes); const types = nodes.map((node) => node.componentType); const forms = types.filter((type) => ['input', 'textarea', 'select', 'checkbox', 'radio', 'switch'].includes(type)); const unique = <T>(values: T[]) => values.filter((value, index) => values.indexOf(value) === index)
    const auth = types.some((type) => type === 'input' || type === 'button') ? ['Credential form review required'] : []; const pages = ['Home']; if (types.includes('navbar')) pages.push('Navigation'); if (auth.length) pages.push('Authentication')
    run.stage = 'analyzing project'
    const plan: CompilationPlan = { id: crypto.randomUUID(), projectId, createdAt: new Date().toISOString(), summary: `${nodes.length} components across ${pages.length} detected pages`, pages, components: unique(types), forms: unique(forms), dependencies: unique(nodes.flatMap((node) => node.dependencies)), routing: { routes: pages.map((page) => page === 'Home' ? '/' : `/${page.toLowerCase()}`), protected: auth.length > 0 }, database: { entities: [], relationships: [] }, api: { endpoints: forms.length ? ['POST /api/forms'] : [] }, state: forms.length ? ['Local form state'] : [], authentication: auth, warnings: stored.validation.warnings, errors: stored.validation.errors, suggestions: forms.length ? ['Add validation rules before generation'] : [] }
    run.stage = 'persisting plan'; run.logs.push('Resolved components', 'Analyzed forms, routes and dependencies', 'Compilation plan ready')
    const db = getSqliteConnection(); db.exec('CREATE TABLE IF NOT EXISTS compilation_plans (id TEXT PRIMARY KEY, project_id TEXT NOT NULL, plan TEXT NOT NULL, validation TEXT NOT NULL, logs TEXT NOT NULL, created_at INTEGER NOT NULL)'); db.prepare('INSERT INTO compilation_plans (id, project_id, plan, validation, logs, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(plan.id, projectId, JSON.stringify(plan), JSON.stringify(stored.validation), JSON.stringify(run.logs), Date.now()); run.stage = 'complete'; return { plan, validation: stored.validation, logs: run.logs }
  }
  cancel(projectId: string) { const value = this.status.get(projectId); if (value) value.cancelled = true; return true }
  getStatus(projectId: string) { return this.status.get(projectId) ?? { stage: 'idle', logs: [], cancelled: false } }
  load(id: string) { const row = getSqliteConnection().prepare('SELECT plan, validation, logs FROM compilation_plans WHERE id = ?').get(id) as { plan: string; validation: string; logs: string } | undefined; return row ? { plan: JSON.parse(row.plan), validation: JSON.parse(row.validation), logs: JSON.parse(row.logs) } : null }
}
