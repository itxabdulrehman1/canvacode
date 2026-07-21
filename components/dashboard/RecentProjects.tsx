'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FolderOpen } from 'lucide-react'
import { useProjectStore } from '@/stores/projectStore'
import { ProjectCard } from './ProjectCard'
import { staggerContainer, staggerItem } from '@/animations/variants'

export function RecentProjects() {
  const router = useRouter()
  const { projects } = useProjectStore()

  // Sort projects by lastOpened or lastModified desc, limit to 4
  const recentProjects = React.useMemo(() => {
    return [...projects]
      .sort((a, b) => new Date(b.lastOpened).getTime() - new Date(a.lastOpened).getTime())
      .slice(0, 4)
  }, [projects])

  const handleViewAll = () => {
    router.push('/projects')
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#e5e2e1]">Recent Projects</h2>
        <button
          onClick={handleViewAll}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors focus:outline-none"
        >
          View all
        </button>
      </div>

      {recentProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-[#262525] rounded-xl p-8 bg-[#100f0f] text-center">
          <FolderOpen className="h-8 w-8 text-[#444748] mb-2" />
          <h3 className="text-xs font-semibold text-[#e5e2e1]">No recent projects</h3>
          <p className="text-[10px] text-[#8e9192] mt-1 max-w-[200px]">
            Create a new workspace layout using the project wizard.
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {recentProjects.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
