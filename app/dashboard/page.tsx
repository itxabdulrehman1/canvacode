'use client'

import { motion } from 'framer-motion'
import { Code2, FolderOpen, Layers, Zap, Activity } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { PinnedProjects } from '@/components/dashboard/PinnedProjects'
import { RecentProjects } from '@/components/dashboard/RecentProjects'
import { TemplatesSection } from '@/components/dashboard/TemplatesSection'
import { StatCard } from '@/components/dashboard/StatCard'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { staggerContainer, staggerItem } from '@/animations/variants'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <motion.div
        className="p-6 flex flex-col gap-6 max-w-6xl mx-auto w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome */}
        <motion.div variants={staggerItem}>
          <WelcomeBanner />
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={staggerItem} className="flex flex-col gap-2">
          <SectionHeader title="Quick Actions" />
          <QuickActions />
        </motion.div>

        {/* Stats row */}
        <motion.div variants={staggerItem}>
          <SectionHeader title="Overview" className="mb-3" />
          <motion.div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <StatCard
              label="Total Projects"
              value={12}
              icon={FolderOpen}
              color="blue"
              trend={{ value: 8, direction: 'up' }}
            />
            <StatCard
              label="Active Builds"
              value={3}
              icon={Zap}
              color="green"
            />
            <StatCard
              label="Components"
              value={247}
              icon={Layers}
              color="purple"
              trend={{ value: 14, direction: 'up' }}
            />
            <StatCard
              label="Deployments"
              icon={Activity}
              value={58}
              color="amber"
              trend={{ value: 2, direction: 'down' }}
            />
          </motion.div>
        </motion.div>

        {/* Pinned Projects Row */}
        <motion.div variants={staggerItem}>
          <PinnedProjects />
        </motion.div>

        {/* Projects and Activities side by side */}
        <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <RecentProjects />
            <TemplatesSection />
          </div>
          <div>
            <RecentActivity />
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
