'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FolderOpen, Code } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { useProjectStore } from '@/stores/projectStore'

export function CreateProjectModal() {
  const { isCreateProjectOpen, closeCreateProject } = useUIStore()
  const { createProject, isLoading } = useProjectStore()

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [framework, setFramework] = React.useState<'Next.js' | 'React' | 'Vue' | 'Electron' | 'Svelte'>('Next.js')
  const [template, setTemplate] = React.useState('Blank Project')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    createProject(name.trim(), description.trim(), framework, template)
    // Clear state
    setName('')
    setDescription('')
    setFramework('Next.js')
    setTemplate('Blank Project')
    closeCreateProject()
  }

  return (
    <AnimatePresence>
      {isCreateProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={closeCreateProject}
            className="absolute inset-0 bg-black"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-[#262525] bg-[#141313] p-6 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between border-b border-[#1c1b1b] pb-4">
              <h2 className="text-base font-semibold text-[#e5e2e1]">Create New Project</h2>
              <button
                onClick={closeCreateProject}
                className="rounded-md p-1 text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              {/* Project Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#8e9192]">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="my-visual-app"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 rounded-md border border-[#262525] bg-[#0a0a0a] px-3 text-xs text-[#e5e2e1] placeholder-[#444748] focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#8e9192]">Description</label>
                <textarea
                  placeholder="Optional project details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full rounded-md border border-[#262525] bg-[#0a0a0a] p-3 text-xs text-[#e5e2e1] placeholder-[#444748] focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Framework Selector */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#8e9192]">Framework</label>
                  <select
                    value={framework}
                    onChange={(e) => setFramework(e.target.value as any)}
                    className="w-full h-9 rounded-md border border-[#262525] bg-[#0a0a0a] px-3 text-xs text-[#e5e2e1] focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="Next.js">Next.js (React)</option>
                    <option value="Electron">Electron (Node)</option>
                    <option value="React">React (Vite)</option>
                    <option value="Vue">Vue</option>
                    <option value="Svelte">Svelte</option>
                  </select>
                </div>

                {/* Template Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#8e9192]">Template</label>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full h-9 rounded-md border border-[#262525] bg-[#0a0a0a] px-3 text-xs text-[#e5e2e1] focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="Blank Project">Blank Project</option>
                    <option value="Admin Dashboard">Admin Dashboard</option>
                    <option value="SaaS App">SaaS App</option>
                    <option value="CRM Dashboard">CRM Dashboard</option>
                    <option value="E-Commerce Store">E-Commerce Store</option>
                    <option value="Portfolio Website">Portfolio Website</option>
                    <option value="Blog Webpage">Blog Webpage</option>
                  </select>
                </div>
              </div>

              {/* Location Placeholder */}
              <div className="flex items-center gap-2 rounded-md bg-[#100f0f] border border-[#1c1b1b] p-3 text-xs text-[#8e9192]">
                <FolderOpen className="h-4 w-4 shrink-0 text-blue-400" />
                <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  Project Workspace: <span className="font-semibold text-[#e5e2e1]">C:/Users/Developer/Projects/{name ? name.toLowerCase().replace(/\s+/g, '-') : 'my-visual-app'}</span>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="mt-2 flex items-center justify-end gap-2 border-t border-[#1c1b1b] pt-4">
                <button
                  type="button"
                  onClick={closeCreateProject}
                  className="h-9 px-4 rounded-md border border-[#262525] bg-transparent hover:bg-[#1c1b1b] text-xs font-semibold text-[#e5e2e1] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !name.trim()}
                  className="h-9 px-5 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-55 text-white text-xs font-semibold transition-colors"
                >
                  {isLoading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
