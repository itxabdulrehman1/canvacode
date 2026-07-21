'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Pin } from 'lucide-react'
import { useProjectStore } from '@/stores/projectStore'
import { ProjectCard } from './ProjectCard'
import { staggerContainer, staggerItem } from '@/animations/variants'

export function PinnedProjects() {
  const { projects } = useProjectStore()

  const pinnedProjects = React.useMemo(() => {
    return projects.filter((p) => p.isPinned)
  }, [projects])

  if (pinnedProjects.length === 0) {
    return null // Return null to hide the section naturally when nothing is pinned
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5 pb-1">
        <Pin className="h-4 w-4 text-blue-400 fill-blue-400" />
        <h2 className="text-sm font-semibold text-[#e5e2e1]">Pinned Projects</h2>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {pinnedProjects.map((project) => (
          <motion.div key={project.id} variants={staggerItem}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
