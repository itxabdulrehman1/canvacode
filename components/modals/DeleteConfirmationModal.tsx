'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { useProjectStore } from '@/stores/projectStore'

export function DeleteConfirmationModal() {
  const { deleteProjectId, setDeleteProjectId } = useUIStore()
  const { projects, deleteProject } = useProjectStore()

  const targetProject = React.useMemo(() => {
    return projects.find((p) => p.id === deleteProjectId)
  }, [projects, deleteProjectId])

  const handleClose = () => {
    setDeleteProjectId(null)
  }

  const handleDelete = () => {
    if (!deleteProjectId) return
    deleteProject(deleteProjectId)
    handleClose()
  }

  return (
    <AnimatePresence>
      {deleteProjectId && targetProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-sm overflow-hidden rounded-xl border border-[#262525] bg-[#141313] p-6 shadow-2xl z-10"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-red-950/30 p-1.5 text-red-500 border border-red-500/20">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-semibold text-[#e5e2e1]">Delete Project</h2>
              </div>
              <button
                onClick={handleClose}
                className="rounded-md p-1 text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3">
              <p className="text-xs text-[#8e9192] leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-[#e5e2e1]">"{targetProject.name}"</span>?
                This action is permanent and cannot be undone. All layout data will be deleted.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                onClick={handleClose}
                className="h-8 px-3 rounded-md border border-[#262525] bg-transparent hover:bg-[#1c1b1b] text-xs font-semibold text-[#e5e2e1] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="h-8 px-4 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
              >
                Delete Project
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
