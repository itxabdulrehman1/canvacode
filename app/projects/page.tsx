'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Grid,
  List as ListIcon,
  Star,
  Pin,
  Plus,
  Trash2,
  Edit2,
  Copy,
  ExternalLink,
  Clock,
  ArrowUpDown,
  Calendar,
  ChevronRight,
  Filter,
  FolderOpen,
  RefreshCw,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { useProjectStore, type MockProject } from '@/stores/projectStore'
import { useUIStore } from '@/stores/uiStore'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import { staggerContainer, staggerItem } from '@/animations/variants'

export default function ProjectsPage() {
  const router = useRouter()
  const {
    projects,
    activeProjectId,
    setActiveProjectId,
    toggleFavorite,
    togglePinned,
    duplicateProject,
  } = useProjectStore()

  const { openCreateProject, setRenameProjectId, setDeleteProjectId } = useUIStore()

  // State filters
  const [searchQuery, setSearchQuery] = React.useState('')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [selectedFramework, setSelectedFramework] = React.useState<string>('All')
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false)
  const [sortBy, setSortBy] = React.useState<'modified' | 'opened' | 'name'>('modified')

  // Selected project details lookup
  const selectedProject = React.useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) || null
  }, [projects, activeProjectId])

  // Filtered & Sorted Projects
  const filteredProjects = React.useMemo(() => {
    return [...projects]
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFramework = selectedFramework === 'All' || p.framework === selectedFramework
        const matchesFavorites = !showFavoritesOnly || p.isFavorite

        return matchesSearch && matchesFramework && matchesFavorites
      })
      .sort((a, b) => {
        if (sortBy === 'modified') {
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
        }
        if (sortBy === 'opened') {
          return new Date(b.lastOpened).getTime() - new Date(a.lastOpened).getTime()
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name)
        }
        return 0
      })
  }, [projects, searchQuery, selectedFramework, showFavoritesOnly, sortBy])

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return isoString
    }
  }

  // Framework coloring helper
  const frameworkStyles: Record<string, string> = {
    'Next.js': 'text-white bg-[#0e0e0e] border-[#222121]',
    Electron: 'text-blue-400 bg-blue-950/20 border-blue-800/30',
    React: 'text-cyan-400 bg-cyan-950/20 border-cyan-800/30',
    Vue: 'text-emerald-400 bg-emerald-950/20 border-emerald-800/30',
    Svelte: 'text-orange-400 bg-orange-950/20 border-orange-800/30',
  }

  const statusVariant: Record<string, 'primary' | 'success' | 'default' | 'warning'> = {
    active: 'success',
    building: 'warning',
    stable: 'primary',
    archived: 'default',
  }

  return (
    <DashboardLayout>
      <div className="flex h-full w-full overflow-hidden">
        {/* Left Column: Manager Controls / Filters */}
        <div className="w-60 border-r border-[#1c1b1b] bg-[#0c0c0c] p-4 flex flex-col gap-5 shrink-0 select-none">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold text-[#e5e2e1]">Projects</h1>
            <button
              onClick={openCreateProject}
              className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              title="Create Project"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8e9192]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-md border border-[#262525] bg-[#141313] text-xs text-[#e5e2e1] placeholder-[#444748] focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* View switcher */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-[#8e9192] uppercase tracking-wider">Layout View</span>
            <div className="grid grid-cols-2 gap-1 bg-[#141313] border border-[#262525] p-0.5 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center justify-center gap-1.5 h-7 rounded text-xs font-semibold transition-colors ${
                  viewMode === 'grid' ? 'bg-[#201f1f] text-[#e5e2e1]' : 'text-[#8e9192] hover:text-[#e5e2e1]'
                }`}
              >
                <Grid className="h-3.5 w-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center gap-1.5 h-7 rounded text-xs font-semibold transition-colors ${
                  viewMode === 'list' ? 'bg-[#201f1f] text-[#e5e2e1]' : 'text-[#8e9192] hover:text-[#e5e2e1]'
                }`}
              >
                <ListIcon className="h-3.5 w-3.5" />
                <span>List</span>
              </button>
            </div>
          </div>

          {/* Framework filters */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-[#8e9192] uppercase tracking-wider flex items-center gap-1">
              <Filter className="h-3 w-3" />
              <span>Frameworks</span>
            </span>
            <div className="flex flex-col gap-1">
              {['All', 'Next.js', 'Electron', 'React', 'Vue', 'Svelte'].map((fw) => (
                <button
                  key={fw}
                  onClick={() => setSelectedFramework(fw)}
                  className={`flex items-center justify-between px-2 h-7 rounded text-xs font-medium transition-all ${
                    selectedFramework === fw
                      ? 'bg-blue-600/10 text-blue-400 font-semibold'
                      : 'text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#141313]'
                  }`}
                >
                  <span>{fw}</span>
                  {selectedFramework === fw && <div className="h-1 w-1 rounded-full bg-blue-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting controls */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-[#8e9192] uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" />
              <span>Sort By</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full h-8 rounded-md border border-[#262525] bg-[#141313] px-2 text-xs text-[#e5e2e1] focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="modified">Recently Modified</option>
              <option value="opened">Recently Opened</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* Favorites filter toggle */}
          <div className="flex items-center gap-2 border-t border-[#1c1b1b] pt-3 mt-1">
            <input
              type="checkbox"
              id="favorites-only"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-[#262525] bg-[#141313] text-blue-500 focus:ring-0 focus:ring-offset-0 focus:outline-none"
            />
            <label htmlFor="favorites-only" className="text-xs font-semibold text-[#8e9192] flex items-center gap-1.5 cursor-pointer">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span>Favorites only</span>
            </label>
          </div>
        </div>

        {/* Center Column: Projects Feed */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#1c1b1b] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8e9192]">Showing {filteredProjects.length} projects</span>
            </div>
          </div>

          {/* Empty states handling */}
          {filteredProjects.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center select-none border border-dashed border-[#262525] rounded-xl bg-[#0a0a0a]">
              <FolderOpen className="h-10 w-10 text-[#3a3939] mb-3" />
              <h2 className="text-sm font-semibold text-[#e5e2e1]">
                {projects.length === 0
                  ? 'No Projects Created'
                  : showFavoritesOnly
                  ? 'No Favorite Projects'
                  : 'No Search Results'}
              </h2>
              <p className="text-xs text-[#8e9192] mt-1.5 max-w-[280px] leading-relaxed">
                {projects.length === 0
                  ? 'Get started by creating your first visual project using our wizard.'
                  : showFavoritesOnly
                  ? 'Try starring projects from the actions menu to pin them here.'
                  : 'We could not find any matches. Adjust your filters or keywords.'}
              </p>
              {projects.length === 0 && (
                <button
                  onClick={openCreateProject}
                  className="mt-4 h-8 px-4 bg-blue-600 hover:bg-blue-500 rounded text-xs font-semibold text-white transition-colors"
                >
                  Create First Project
                </button>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <ProjectCard
                    project={project}
                    onSelect={setActiveProjectId}
                    isSelected={activeProjectId === project.id}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* List View */
            <div className="flex flex-col gap-1 border border-[#1c1b1b] rounded-lg overflow-hidden bg-[#0c0c0c]">
              <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-[#141313] border-b border-[#1c1b1b] text-[10px] font-bold text-[#8e9192] uppercase tracking-wider select-none">
                <span className="col-span-5">Project Name</span>
                <span className="col-span-2">Framework</span>
                <span className="col-span-1 text-center">Version</span>
                <span className="col-span-3">Last Opened</span>
                <span className="col-span-1"></span>
              </div>

              <div className="flex flex-col divide-y divide-[#1c1b1b]">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setActiveProjectId(project.id)}
                    className={`grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-[#181717] transition-colors cursor-pointer select-none ${
                      activeProjectId === project.id ? 'bg-[#151414]' : ''
                    }`}
                  >
                    {/* Name */}
                    <div className="col-span-5 flex items-center gap-3 min-w-0">
                      <div className="h-7 w-7 rounded bg-[#141313] border border-[#262525] flex items-center justify-center shrink-0">
                        <FolderOpen className="h-4 w-4 text-[#8e9192]" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-[#e5e2e1] block leading-tight">{project.name}</span>
                        <span className="text-[10px] text-[#8e9192] line-clamp-1">{project.description}</span>
                      </div>
                    </div>

                    {/* Framework */}
                    <div className="col-span-2">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded border inline-block ${
                          frameworkStyles[project.framework] || 'text-[#8e9192] bg-[#1c1b1b]'
                        }`}
                      >
                        {project.framework}
                      </span>
                    </div>

                    {/* Version */}
                    <div className="col-span-1 text-center text-xs font-medium text-[#8e9192]">
                      v{project.version}
                    </div>

                    {/* Last Opened */}
                    <div className="col-span-3 flex items-center gap-1.5 text-xs text-[#8e9192]">
                      <Clock className="h-3.5 w-3.5 text-[#3a3939]" />
                      <span>{formatDate(project.lastOpened)}</span>
                    </div>

                    {/* Floating Pins */}
                    <div className="col-span-1 flex items-center justify-end gap-1.5">
                      {project.isPinned && <Pin className="h-3.5 w-3.5 text-blue-400 fill-blue-400" />}
                      {project.isFavorite && <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Project Details Panel */}
        <div className="w-80 border-l border-[#1c1b1b] bg-[#0c0c0c] p-5 flex flex-col gap-5 shrink-0 overflow-y-auto select-none">
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex flex-col gap-5 h-full"
              >
                {/* Details Header */}
                <div className="flex flex-col gap-2">
                  <div className="h-28 rounded-lg bg-[#0a0a0a] border border-[#1c1b1b] flex items-center justify-center relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'radial-gradient(#2a2a2a 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                      }}
                    />
                    <FolderOpen className="h-10 w-10 text-blue-500 relative z-10" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mt-1">
                      <h2 className="text-sm font-bold text-[#e5e2e1] truncate">{selectedProject.name}</h2>
                      <Badge variant={statusVariant[selectedProject.status]}>{selectedProject.status}</Badge>
                    </div>
                    <span className="text-[10px] text-[#8e9192]">v{selectedProject.version}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-[#8e9192] uppercase tracking-wider">Description</span>
                  <p className="text-xs text-[#e5e2e1] leading-relaxed bg-[#141313] p-3 rounded-lg border border-[#1c1b1b]">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Metadata Fields */}
                <div className="flex flex-col gap-2 bg-[#141313] border border-[#1c1b1b] p-3.5 rounded-lg text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#8e9192]">Framework</span>
                    <span className="font-semibold text-[#e5e2e1]">{selectedProject.framework}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-[#1c1b1b]">
                    <span className="text-[#8e9192]">Created On</span>
                    <span className="font-medium text-[#e5e2e1]">{formatDate(selectedProject.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-[#1c1b1b]">
                    <span className="text-[#8e9192]">Last Modified</span>
                    <span className="font-medium text-[#e5e2e1]">{formatDate(selectedProject.lastModified)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-[#1c1b1b]">
                    <span className="text-[#8e9192]">Template</span>
                    <span className="font-medium text-[#e5e2e1]">{selectedProject.template}</span>
                  </div>
                </div>

                {/* Location Placeholder */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-[#8e9192] uppercase tracking-wider">Directory Location</span>
                  <div className="text-[10px] font-mono text-[#8e9192] bg-[#0a0a0a] p-2.5 rounded border border-[#1c1b1b] truncate">
                    {selectedProject.path}
                  </div>
                </div>

                {/* Recent Compile Placeholder */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-[#8e9192] uppercase tracking-wider">Build Status</span>
                  <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 p-2.5 rounded border border-green-500/15">
                    <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                    <span>Last compilation succeeded. Ready.</span>
                  </div>
                </div>

                {/* Primary Actions Button Column */}
                <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-[#1c1b1b]">
                  <button
                    onClick={() => router.push(`/workspace?id=${selectedProject.id}`)}
                    className="flex items-center justify-center gap-2 h-9 w-full rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open Workspace</span>
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setRenameProjectId(selectedProject.id)}
                      className="flex items-center justify-center gap-1.5 h-8 rounded border border-[#262525] bg-[#141313] hover:bg-[#201f1f] text-[#e5e2e1] text-[10px] font-bold transition-colors"
                      title="Rename"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-green-400" />
                      <span>Rename</span>
                    </button>
                    <button
                      onClick={() => duplicateProject(selectedProject.id)}
                      className="flex items-center justify-center gap-1.5 h-8 rounded border border-[#262525] bg-[#141313] hover:bg-[#201f1f] text-[#e5e2e1] text-[10px] font-bold transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Clone</span>
                    </button>
                    <button
                      onClick={() => setDeleteProjectId(selectedProject.id)}
                      className="flex items-center justify-center gap-1.5 h-8 rounded border border-red-500/20 bg-red-950/15 hover:bg-red-950/30 text-red-400 text-[10px] font-bold transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => togglePinned(selectedProject.id)}
                      className={`flex items-center justify-center gap-1.5 h-8 rounded border border-[#262525] text-[10px] font-bold transition-all ${
                        selectedProject.isPinned
                          ? 'bg-blue-600/10 border-blue-500/25 text-blue-400'
                          : 'bg-[#141313] hover:bg-[#201f1f] text-[#e5e2e1]'
                      }`}
                    >
                      <Pin className="h-3.5 w-3.5" />
                      <span>{selectedProject.isPinned ? 'Pinned' : 'Pin'}</span>
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedProject.id)}
                      className={`flex items-center justify-center gap-1.5 h-8 rounded border border-[#262525] text-[10px] font-bold transition-all ${
                        selectedProject.isFavorite
                          ? 'bg-amber-600/10 border-amber-500/25 text-amber-400'
                          : 'bg-[#141313] hover:bg-[#201f1f] text-[#e5e2e1]'
                      }`}
                    >
                      <Star className="h-3.5 w-3.5" />
                      <span>{selectedProject.isFavorite ? 'Starred' : 'Star'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* No Project Selected Placeholder */
              <div className="h-full flex flex-col items-center justify-center text-center p-4 select-none">
                <FolderOpen className="h-8 w-8 text-[#262525] mb-2" />
                <h3 className="text-xs font-semibold text-[#8e9192]">No Project Selected</h3>
                <p className="text-[10px] text-[#444748] mt-1 leading-relaxed max-w-[200px]">
                  Select a project from the manager feed to inspect layout details, parameters, and directories.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  )
}
