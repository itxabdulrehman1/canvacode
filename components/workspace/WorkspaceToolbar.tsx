'use client'

import * as React from 'react'

import {
  MousePointer2, Move, ZoomIn, ZoomOut, Maximize2,
  Grid3x3, Magnet, Play, Layers, Download
} from 'lucide-react'
import { cn } from '@/lib/utils'

const TOOLBAR_GROUPS = [
  {
    id: 'select',
    tools: [
      { id: 'pointer', icon: MousePointer2, label: 'Select (V)' },
      { id: 'pan', icon: Move, label: 'Pan (H)' },
    ],
  },
  {
    id: 'view',
    tools: [
      { id: 'zoom-in', icon: ZoomIn, label: 'Zoom In (+)' },
      { id: 'zoom-out', icon: ZoomOut, label: 'Zoom Out (-)' },
      { id: 'fit', icon: Maximize2, label: 'Fit to Screen (Shift+1)' },
    ],
  },
  {
    id: 'canvas',
    tools: [
      { id: 'grid', icon: Grid3x3, label: 'Toggle Grid (G)' },
      { id: 'snap', icon: Magnet, label: 'Toggle Snap (S)' },
      { id: 'layers', icon: Layers, label: 'Layers Panel (L)' },
    ],
  },
]

interface WorkspaceToolbarProps {
  className?: string
}

export function WorkspaceToolbar({ className }: WorkspaceToolbarProps) {
  const projectId = typeof window === 'undefined' ? 'default-project' : new URLSearchParams(window.location.search).get('id') || 'default-project'
  const [isGenerating, setIsGenerating] = React.useState(false)
  const requireDesktop = () => window.alert('This action requires the CanvasCode desktop app. Stop the browser server and run: npm run electron:dev')
  const exportProject = () => { if (!window.canvasCodeAPI?.workspace) return requireDesktop(); void window.canvasCodeAPI.workspace.exportDialog(projectId) }
  const generateProject = async () => { if (!window.canvasCodeAPI?.generation) return requireDesktop(); if (isGenerating) return; setIsGenerating(true); try { const result = await window.canvasCodeAPI.generation.project(projectId); if (result.errors.length) throw new Error(result.errors.join('; ')); window.location.reload() } catch (error) { window.alert(error instanceof Error ? error.message : 'Code generation failed') } finally { setIsGenerating(false) } }
  const previewProject = () => window.alert('Live Preview is already open in the Preview panel. Use its desktop, tablet, and mobile buttons to change device mode.')
  return (
    <div
      className={cn(
        'flex items-center gap-1 h-10 px-2 shrink-0',
        'bg-[#141313] border-b border-[#1c1b1b]',
        className
      )}
      role="toolbar"
      aria-label="Workspace tools"
    >
      {TOOLBAR_GROUPS.map((group, gi) => (
        <div key={group.id} className="flex items-center gap-0.5">
          {gi > 0 && <div className="w-px h-5 bg-[#353434] mx-1" aria-hidden="true" />}
          {group.tools.map((tool) => {
            const Icon = tool.icon
            return (
              <button
                key={tool.id}
                title={tool.label}
                aria-label={tool.label}
                className="flex items-center justify-center h-7 w-7 rounded text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#201f1f] transition-colors active:bg-[#2a2a2a]"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      ))}

      <div className="flex-1" />

      <button
        onClick={exportProject}
        className="flex items-center gap-1.5 h-7 px-2.5 rounded text-xs font-medium border border-[#353434] text-[#e5e2e1] hover:bg-[#201f1f] transition-colors"
        aria-label="Export generated project"
      >
        <Download className="h-3 w-3" aria-hidden="true" />
        Export
      </button>

      <button
        onClick={() => void generateProject()}
        disabled={isGenerating}
        className="flex items-center gap-1.5 h-7 px-2.5 rounded text-xs font-medium bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-50 transition-colors"
        aria-label="Generate project code"
      >
        <Play className="h-3 w-3" aria-hidden="true" />
        {isGenerating ? 'Generating…' : 'Generate Code'}
      </button>

      {/* Right actions */}
      <button
        onClick={previewProject}
        className="flex items-center gap-1.5 h-7 px-2.5 rounded text-xs font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors"
        aria-label="Preview"
      >
        <Play className="h-3 w-3" aria-hidden="true" />
        Preview
      </button>
    </div>
  )
}
