'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { useProjectStore } from '@/stores/projectStore'

export function RenameProjectModal() {
  const { renameProjectId, setRenameProjectId } = useUIStore()
  const { projects, renameProject } = useProjectStore()
  const [newName, setNewName] = React.useState('')

  const targetProject = React.useMemo(() => {
    return projects.find((p) => p.id === renameProjectId)
  }, [projects, renameProjectId])

  React.useEffect(() => {
    if (targetProject) {
      setNewName(targetProject.name)
    }
  }, [targetProject])

  const handleClose = () => {
    setRenameProjectId(null)
    setNewName('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !renameProjectId) return

    renameProject(renameProjectId, newName.trim())
    handleClose()
  }

  return (
    <AnimatePresence>
      {renameProjectId && targetProject && (
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
            <div className="flex items-center justify-between border-b border-[#1c1b1b] pb-3">
              <h2 className="text-sm font-semibold text-[#e5e2e1]">Rename Project</h2>
              <button
                onClick={handleClose}
                className="rounded-md p-1 text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#8e9192]">New Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter project name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full h-9 rounded-md border border-[#262525] bg-[#0a0a0a] px-3 text-xs text-[#e5e2e1] focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="h-8 px-3 rounded-md border border-[#262525] bg-transparent hover:bg-[#1c1b1b] text-xs font-semibold text-[#e5e2e1] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newName.trim()}
                  className="h-8 px-4 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-55 text-white text-xs font-semibold transition-colors"
                >
                  Rename
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
