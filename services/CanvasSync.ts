'use client'

import type { CanvasDocument } from '@/types/canvas-engine.types'

type SyncState = 'idle' | 'saving' | 'error'
type Listener = (state: SyncState, error?: string) => void

class CanvasSync {
  private timers = new Map<string, ReturnType<typeof setTimeout>>()
  private queued = new Map<string, CanvasDocument>()
  private listeners = new Set<Listener>()

  subscribe(listener: Listener) { this.listeners.add(listener); return () => this.listeners.delete(listener) }
  private notify(state: SyncState, error?: string) { this.listeners.forEach((listener) => listener(state, error)) }
  schedule(projectId: string, document: CanvasDocument) {
    this.queued.set(projectId, structuredClone(document))
    const previous = this.timers.get(projectId); if (previous) clearTimeout(previous)
    this.timers.set(projectId, setTimeout(() => void this.flush(projectId), 300))
  }
  async flush(projectId: string) {
    const document = this.queued.get(projectId); if (!document) return
    this.timers.delete(projectId); this.notify('saving')
    try {
      if (window.canvasCodeAPI?.canvas) await window.canvasCodeAPI.canvas.save(projectId, document)
      else localStorage.setItem(`canvas:${projectId}`, JSON.stringify(document))
      if (this.queued.get(projectId) === document) this.queued.delete(projectId)
      this.notify('idle')
    } catch (error) {
      this.notify('error', error instanceof Error ? error.message : 'Unable to save canvas')
      this.timers.set(projectId, setTimeout(() => void this.flush(projectId), 1500))
    }
  }
  async flushAll() { await Promise.all(Array.from(this.queued.keys()).map((projectId) => this.flush(projectId))) }
}
export const canvasSync = new CanvasSync()
