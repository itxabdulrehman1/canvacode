import { CanvasRepository } from '../repositories/CanvasRepository'
import type { CanvasDocument } from '../../types/canvas-engine.types'
export class CanvasService {
  private repository = new CanvasRepository()
  load(projectId: string) { if (!projectId) throw new Error('A project id is required'); return this.repository.load(projectId) }
  save(projectId: string, document: CanvasDocument) {
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(projectId) || !document || !Array.isArray(document.nodes) || !Array.isArray(document.edges)) throw new Error('Invalid canvas save request')
    for (const node of document.nodes) {
      if (!node.id || !node.type || !node.data || !Number.isFinite(node.position?.x) || !Number.isFinite(node.position?.y) || !Number.isFinite(node.data.width) || !Number.isFinite(node.data.height)) {
        throw new Error('Canvas contains invalid node data')
      }
    }
    if (!Number.isFinite(document.viewport?.x) || !Number.isFinite(document.viewport?.y) || !Number.isFinite(document.viewport?.zoom)) throw new Error('Canvas contains an invalid viewport')
    this.repository.save(projectId, document)
    return { success: true as const }
  }
}
