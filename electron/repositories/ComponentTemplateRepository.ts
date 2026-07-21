import { getSqliteConnection } from '../db/connection'
import type { ComponentCodeDefinition, ComponentTemplate } from '../../types/component-code.types'
import type { CanvasNodeType } from '../../types/canvas-engine.types'

export class ComponentTemplateRepository {
  upsert(definition: ComponentCodeDefinition) {
    const db = getSqliteConnection(); const now = Date.now()
    db.transaction(() => {
      db.prepare('INSERT INTO component_registry (id, name, category, description, metadata, version, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET name=excluded.name, category=excluded.category, description=excluded.description, metadata=excluded.metadata, version=excluded.version, updated_at=excluded.updated_at').run(definition.id, definition.name, definition.category, definition.description, JSON.stringify({ properties: definition.properties, events: definition.events, styles: definition.styles, supportsChildren: definition.supportsChildren }), definition.version, now)
      db.prepare('DELETE FROM component_templates WHERE component_id = ?').run(definition.id); db.prepare('DELETE FROM component_dependencies WHERE component_id = ?').run(definition.id)
      const template = db.prepare('INSERT INTO component_templates (component_id, framework, export_name, imports, dependencies, code, property_mapping) VALUES (?, ?, ?, ?, ?, ?, ?)')
      const dependency = db.prepare('INSERT INTO component_dependencies (component_id, dependency) VALUES (?, ?)')
      definition.templates.forEach((item) => { template.run(definition.id, item.framework, item.exportName, JSON.stringify(item.imports), JSON.stringify(item.dependencies), item.code, JSON.stringify(item.propertyMapping)); item.dependencies.forEach((value) => dependency.run(definition.id, value)) })
      db.prepare('INSERT OR REPLACE INTO component_versions (component_id, version, metadata, created_at) VALUES (?, ?, ?, ?)').run(definition.id, definition.version, JSON.stringify(definition), now)
    })()
  }
  getTemplate(id: string, framework: ComponentTemplate['framework']) { const row = getSqliteConnection().prepare('SELECT * FROM component_templates WHERE component_id = ? AND framework = ?').get(id, framework) as { component_id: string; framework: ComponentTemplate['framework']; export_name: string; imports: string; dependencies: string; code: string; property_mapping: string } | undefined; return row ? { componentId: row.component_id as CanvasNodeType, framework: row.framework, exportName: row.export_name, imports: JSON.parse(row.imports), dependencies: JSON.parse(row.dependencies), code: row.code, propertyMapping: JSON.parse(row.property_mapping) } satisfies ComponentTemplate : null }
  getMetadata(id: string) { const row = getSqliteConnection().prepare('SELECT * FROM component_registry WHERE id = ?').get(id) as { id: string; name: string; category: string; description: string; metadata: string; version: string } | undefined; return row ? { id: row.id, name: row.name, category: row.category, description: row.description, version: row.version, ...JSON.parse(row.metadata) } : null }
  getDependencies(id: string) { return (getSqliteConnection().prepare('SELECT dependency FROM component_dependencies WHERE component_id = ?').all(id) as { dependency: string }[]).map((row) => row.dependency) }
}
