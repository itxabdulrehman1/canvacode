'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Star, FolderOpen } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { useProjectStore } from '@/stores/projectStore'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import { staggerContainer, staggerItem } from '@/animations/variants'

export default function FavoritesPage() {
  const { projects } = useProjectStore()

  const favoriteProjects = React.useMemo(() => {
    return projects.filter((p) => p.isFavorite)
  }, [projects])

  return (
    <DashboardLayout>
      <motion.div
        className="p-6 flex flex-col gap-6 max-w-6xl mx-auto w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem}>
          <div className="flex flex-col gap-1 mb-2">
            <h1 className="text-xl font-bold text-[#e5e2e1] flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <span>Favorites & Bookmarks</span>
            </h1>
            <p className="text-xs text-[#8e9192]">
              Access your starred visual project directories and quick workspace configurations.
            </p>
          </div>
        </motion.div>

        <motion.div variants={staggerItem}>
          {favoriteProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[#262525] rounded-xl bg-[#0a0a0a]">
              <FolderOpen className="h-10 w-10 text-[#3a3939] mb-3" />
              <h2 className="text-sm font-semibold text-[#e5e2e1]">No Favorites Bookmarked</h2>
              <p className="text-xs text-[#8e9192] mt-1.5 max-w-[280px] leading-relaxed">
                Add projects to favorites from the card option dropdown menu to display them here.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {favoriteProjects.map((project) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
