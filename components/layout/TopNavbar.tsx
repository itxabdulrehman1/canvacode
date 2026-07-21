'use client'

import { compileArchitecture } from '@/lib/compiler'
import { useCanvasStore } from '@/store/useCanvasStore'

type ViewMode = 'ui' | 'backend'

interface TopNavbarProps {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  onCompile: () => void
  onExport: () => void
  onToggleCopilot: () => void
}

export default function TopNavbar({
  viewMode,
  setViewMode,
  onCompile,
  onExport,
  onToggleCopilot,
}: TopNavbarProps) {
  const elements = useCanvasStore((state) => state.elements)

  const handleCompile = async () => {
    await compileArchitecture(elements)
    onCompile()
  }

  return (
    <nav className="bg-surface-container-low text-primary font-body-sm text-body-sm border-b border-outline-variant flex justify-between items-center h-12 px-md w-full z-50 shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-sm">
        <span
          className="material-symbols-outlined text-secondary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          widgets
        </span>
        <span className="font-display text-display font-semibold tracking-tighter text-primary">
          CanvasCode
        </span>
      </div>

      {/* UI / Backend toggle pill */}
      <div className="flex items-center bg-surface-variant rounded-full p-1 border border-outline-variant">
        <button
          onClick={() => setViewMode('ui')}
          className={`px-lg py-sm rounded-full font-bold active:scale-95 transition-all duration-200 ${viewMode === 'ui'
              ? 'text-secondary bg-surface-container-high border-b border-secondary'
              : 'text-on-surface-variant font-medium hover:text-primary'
            }`}
        >
          UI Canvas
        </button>

        <button
          onClick={() => setViewMode('backend')}
          className={`px-lg py-sm rounded-full font-bold active:scale-95 transition-all duration-200 ${viewMode === 'backend'
              ? 'text-secondary bg-surface-container-high border-b border-secondary'
              : 'text-on-surface-variant font-medium hover:text-primary'
            }`}
        >
          Backend Blueprint
        </button>
      </div>

      {/* Trailing actions */}
      <div className="flex items-center gap-md">
        <div className="flex gap-sm">
          <button
            title="Settings"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>

          <button
            title="Open Copilot"
            onClick={onToggleCopilot}
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            <span className="material-symbols-outlined">help</span>
          </button>

          <button
            title="Export / GitHub PR"
            onClick={onExport}
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>

        <button
          onClick={() => void handleCompile()}
          className="bg-primary text-surface-container-lowest font-body-sm text-body-sm font-semibold px-md py-sm rounded shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:opacity-90 transition-opacity active:scale-95"
        >
          Compile Architecture
        </button>
      </div>
    </nav>
  )
}