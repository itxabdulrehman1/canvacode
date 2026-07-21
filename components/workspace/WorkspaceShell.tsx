'use client'

import { motion } from 'framer-motion'
import { CanvasAreaPlaceholder } from './CanvasAreaPlaceholder'
import { DynamicPropertyInspector } from './DynamicPropertyInspector'
import { LivePreviewPanel } from './LivePreviewPanel'
import { BackendCodePanel } from './BackendCodePanel'

export function WorkspaceShell() {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Main canvas area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <CanvasAreaPlaceholder />
      </div>

      <LivePreviewPanel />

      <BackendCodePanel projectId={typeof window === 'undefined' ? 'default-project' : new URLSearchParams(window.location.search).get('id') || 'default-project'} />

      {/* Right inspector */}
      <motion.aside
        className="w-72 shrink-0 border-l border-[#1c1b1b] bg-[#141313] overflow-y-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <DynamicPropertyInspector />
      </motion.aside>
    </div>
  )
}
