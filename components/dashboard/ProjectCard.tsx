'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Clock,
  FolderOpen,
  Star,
  Pin,
  MoreVertical,
  Edit2,
  Copy,
  Trash2,
  ExternalLink,
  Tag,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useProjectStore, type MockProject } from '@/stores/projectStore'
import { useUIStore } from '@/stores/uiStore'

interface ProjectCardProps {
  project: MockProject
  onSelect?: (id: string) => void
  isSelected?: boolean
}

export function ProjectCard({ project, onSelect, isSelected }: ProjectCardProps) {
  const router = useRouter()
  const { toggleFavorite, togglePinned, duplicateProject } = useProjectStore()
  const { setRenameProjectId, setDeleteProjectId } = useUIStore()
  const [showDropdown, setShowDropdown] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleOpen = () => {
    // Open project: navigate to workspace page
    router.push(`/workspace?id=${project.id}`)
  }

  // Format dates cleanly
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
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
    <Card
      className={cn(
        'cursor-pointer group relative hover:border-[#444748] hover:bg-[#181717] transition-all duration-150 border-[#262525] bg-[#100f0f]',
        isSelected && 'border-blue-500 bg-[#161515] hover:border-blue-500'
      )}
      noPadding
      onClick={() => onSelect?.(project.id)}
    >
      {/* Star and Pin Floating Indicators */}
      <div className="absolute top-2 left-2 z-10 flex gap-1">
        {project.isPinned && (
          <div className="rounded-md bg-blue-950/40 p-1 text-blue-400 border border-blue-900/30">
            <Pin className="h-3 w-3 fill-blue-400" />
          </div>
        )}
        {project.isFavorite && (
          <div className="rounded-md bg-amber-950/40 p-1 text-amber-400 border border-amber-900/30">
            <Star className="h-3 w-3 fill-amber-400" />
          </div>
        )}
      </div>

      {/* Action Dropdown Toggle Button */}
      <div className="absolute top-2 right-2 z-20" ref={dropdownRef}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowDropdown(!showDropdown)
          }}
          className="rounded-md p-1.5 bg-[#141313] border border-[#262525] text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-all"
        >
          <MoreVertical className="h-3.5 w-3.5" />
        </button>

        {/* Dropdown Options List */}
        {showDropdown && (
          <div className="absolute right-0 mt-1 w-36 rounded-md border border-[#262525] bg-[#141313] p-1 shadow-lg z-30">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDropdown(false)
                handleOpen()
              }}
              className="flex items-center gap-2 h-7 w-full px-2 rounded hover:bg-[#1c1b1b] text-left text-xs font-semibold text-[#e5e2e1]"
            >
              <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
              <span>Open Project</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDropdown(false)
                setRenameProjectId(project.id)
              }}
              className="flex items-center gap-2 h-7 w-full px-2 rounded hover:bg-[#1c1b1b] text-left text-xs font-semibold text-[#e5e2e1]"
            >
              <Edit2 className="h-3.5 w-3.5 text-green-400" />
              <span>Rename</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDropdown(false)
                duplicateProject(project.id)
              }}
              className="flex items-center gap-2 h-7 w-full px-2 rounded hover:bg-[#1c1b1b] text-left text-xs font-semibold text-[#e5e2e1]"
            >
              <Copy className="h-3.5 w-3.5 text-cyan-400" />
              <span>Duplicate</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDropdown(false)
                toggleFavorite(project.id)
              }}
              className="flex items-center gap-2 h-7 w-full px-2 rounded hover:bg-[#1c1b1b] text-left text-xs font-semibold text-[#e5e2e1]"
            >
              <Star className="h-3.5 w-3.5 text-amber-400" />
              <span>{project.isFavorite ? 'Unfavorite' : 'Favorite'}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDropdown(false)
                togglePinned(project.id)
              }}
              className="flex items-center gap-2 h-7 w-full px-2 rounded hover:bg-[#1c1b1b] text-left text-xs font-semibold text-[#e5e2e1]"
            >
              <Pin className="h-3.5 w-3.5 text-blue-400" />
              <span>{project.isPinned ? 'Unpin' : 'Pin Project'}</span>
            </button>
            <div className="border-t border-[#1c1b1b] my-1" />
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDropdown(false)
                setDeleteProjectId(project.id)
              }}
              className="flex items-center gap-2 h-7 w-full px-2 rounded hover:bg-[#ef4444]/10 text-left text-xs font-semibold text-[#ef4444]"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      {/* Main card representation */}
      <div className="p-3.5 flex flex-col gap-3">
        {/* Project workspace grid header */}
        <div
          className="h-24 rounded-lg bg-[#0a0a0a] border border-[#1c1b1b] flex items-center justify-center relative overflow-hidden"
          onClick={(e) => {
            e.stopPropagation()
            handleOpen()
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#2a2a2a 1px, transparent 1px)',
              backgroundSize: '10px 10px',
            }}
            aria-hidden="true"
          />
          <FolderOpen className="h-7 w-7 text-[#3a3939] group-hover:text-blue-500/80 transition-colors relative z-10" />
        </div>

        {/* Project meta info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xs font-bold text-[#e5e2e1] leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            <span className="text-[9px] font-semibold text-[#8e9192] px-1 bg-[#1c1b1b] rounded border border-[#2a2929]">
              v{project.version}
            </span>
          </div>

          <p className="text-[10px] text-[#8e9192] line-clamp-2 min-h-[28px] leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center justify-between mt-1 pt-2 border-t border-[#1c1b1b]">
            <div className="flex items-center gap-1.5">
              <Badge variant={statusVariant[project.status]} dot>
                {project.status}
              </Badge>
              <span
                className={cn(
                  'text-[9px] font-bold px-1.5 py-0.5 rounded border',
                  frameworkStyles[project.framework] || 'text-[#8e9192] bg-[#1c1b1b]'
                )}
              >
                {project.framework}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[9px] text-[#8e9192]">
              <Clock className="h-2.5 w-2.5" />
              <span>Mod: {formatDate(project.lastModified)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
