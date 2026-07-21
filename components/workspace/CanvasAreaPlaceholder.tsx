'use client'
import { CanvasEditor } from '@/components/canvas/CanvasEditor'
export function CanvasAreaPlaceholder() {
  const projectId = typeof window === 'undefined' ? 'default-project' : new URLSearchParams(window.location.search).get('id') || 'default-project'
  return <div className="flex-1 min-h-0 bg-[#0e0e0e]"><CanvasEditor projectId={projectId} /></div>
}
