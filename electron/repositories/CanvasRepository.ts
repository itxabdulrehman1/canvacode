import { getSqliteConnection } from '../db/connection'
import type { CanvasDocument } from '../../types/canvas-engine.types'

export class CanvasRepository {
  load(projectId: string): CanvasDocument {
    const db = getSqliteConnection()
    const rows = db.prepare('SELECT * FROM canvas_nodes WHERE project_id = ? ORDER BY created_at').all(projectId) as any[]
    const edges = db.prepare('SELECT * FROM canvas_edges WHERE project_id = ?').all(projectId) as any[]
    const viewport = db.prepare('SELECT * FROM canvas_viewports WHERE project_id = ?').get(projectId) as any
    return { nodes: rows.map((row) => ({ id: row.id, type: row.type, parentId: row.parent_id || undefined, position: { x: row.position_x, y: row.position_y }, selected: Boolean(row.selected), hidden: JSON.parse(row.properties).visible === false, data: { label: row.label, width: row.width, height: row.height, properties: JSON.parse(row.properties), children: JSON.parse(row.children), createdAt: new Date(row.created_at).toISOString(), updatedAt: new Date(row.updated_at).toISOString(), locked: Boolean(row.locked), visible: JSON.parse(row.properties).visible !== false }, style: { width: row.width, height: row.height, zIndex: row.z_index } })), edges: edges.map((edge) => ({ id: edge.id, source: edge.source, target: edge.target, data: JSON.parse(edge.data) })), viewport: viewport ? { x: viewport.x, y: viewport.y, zoom: viewport.zoom } : { x: 0, y: 0, zoom: 1 } }
  }
  save(projectId: string, document: CanvasDocument): void {
    const db = getSqliteConnection(); const now = Date.now()
    db.transaction(() => {
      db.prepare('INSERT INTO projects (id, name, framework, created_at, updated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET updated_at = excluded.updated_at').run(projectId, 'Untitled Project', 'React', now, now)
      db.prepare('DELETE FROM canvas_nodes WHERE project_id = ?').run(projectId); db.prepare('DELETE FROM canvas_edges WHERE project_id = ?').run(projectId)
      const node = db.prepare('INSERT INTO canvas_nodes (id, project_id, type, label, position_x, position_y, width, height, properties, children, locked, selected, created_at, updated_at, parent_id, z_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      document.nodes.forEach((item, index) => { const d = item.data; const properties = { ...d.properties, visible: d.visible !== false }; node.run(item.id, projectId, item.type, d.label, item.position.x, item.position.y, d.width, d.height, JSON.stringify(properties), JSON.stringify(d.children), Number(d.locked), Number(Boolean(item.selected)), Date.parse(d.createdAt) || now, Date.parse(d.updatedAt) || now, item.parentId ?? null, Number(item.style?.zIndex ?? index)) })
      const edge = db.prepare('INSERT INTO canvas_edges (id, project_id, source, target, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
      document.edges.forEach((item) => edge.run(item.id, projectId, item.source, item.target, JSON.stringify(item.data ?? {}), now, now))
      db.prepare('INSERT INTO canvas_viewports (project_id, x, y, zoom) VALUES (?, ?, ?, ?) ON CONFLICT(project_id) DO UPDATE SET x = excluded.x, y = excluded.y, zoom = excluded.zoom').run(projectId, document.viewport.x, document.viewport.y, document.viewport.zoom)
    })()
  }
}
