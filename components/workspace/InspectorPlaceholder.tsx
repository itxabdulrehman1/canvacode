'use client'
import { ChevronDown, ChevronRight, Eye, EyeOff, Layers, Lock, Unlock } from 'lucide-react'
import { useCanvasEngineStore } from '@/stores/canvasEngineStore'
import type { CanvasNode } from '@/types/canvas-engine.types'

export function InspectorPlaceholder() {
  const nodes = useCanvasEngineStore((state) => state.nodes)
  const setNodes = useCanvasEngineStore((state) => state.setNodes)
  const roots = nodes.filter((node) => !node.parentId)
  const select = (id: string) => setNodes(nodes.map((node) => ({ ...node, selected: node.id === id })))
  const update = (node: CanvasNode, patch: Partial<CanvasNode['data']>) => {
    const data = { ...node.data, ...patch, properties: { ...node.data.properties, visible: patch.visible ?? node.data.visible } }
    setNodes(nodes.map((item) => item.id === node.id ? { ...item, hidden: data.visible === false, data } : item))
    window.dispatchEvent(new CustomEvent('canvas-node-update', { detail: { id: node.id, patch: { hidden: data.visible === false, data } } }))
  }
  const row = (node: CanvasNode, depth = 0) => <div key={node.id}><div className={`group flex items-center gap-1 px-2 py-1.5 text-xs ${node.selected ? 'bg-blue-500/15 text-blue-300' : 'text-[#c4c7c8] hover:bg-[#201f1f]'}`} style={{ paddingLeft: 8 + depth * 16 }}><button onClick={() => select(node.id)} className="flex min-w-0 flex-1 items-center gap-1.5 text-left"><ChevronRight className="h-3 w-3"/><span className="truncate">{node.data.label}</span></button><button title={node.data.visible === false ? 'Show layer' : 'Hide layer'} onClick={() => update(node, { visible: node.data.visible === false })}>{node.data.visible === false ? <EyeOff className="h-3.5 w-3.5 text-[#777]"/> : <Eye className="h-3.5 w-3.5"/>}</button><button title={node.data.locked ? 'Unlock layer' : 'Lock layer'} onClick={() => update(node, { locked: !node.data.locked })}>{node.data.locked ? <Lock className="h-3.5 w-3.5 text-amber-400"/> : <Unlock className="h-3.5 w-3.5 text-[#777]"/>}</button></div>{nodes.filter((child) => child.parentId === node.id).map((child) => row(child, depth + 1))}</div>
  return <div className="flex h-full flex-col"><div className="flex h-10 items-center gap-2 border-b border-[#1c1b1b] px-3"><Layers className="h-4 w-4 text-blue-400"/><span className="text-xs font-semibold uppercase tracking-wider text-[#c4c7c8]">Layers</span></div><div className="flex-1 overflow-y-auto py-2">{roots.length ? roots.map((node) => row(node)) : <div className="p-5 text-center text-xs text-[#666]">Canvas layers appear here.</div>}</div></div>
}
