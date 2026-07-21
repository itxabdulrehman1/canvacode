'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { RecentProjects } from '@/components/dashboard/RecentProjects'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { staggerContainer, staggerItem } from '@/animations/variants'

export default function RecentPage() {
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
            <h1 className="text-xl font-bold text-[#e5e2e1]">Recent Workspaces</h1>
            <p className="text-xs text-[#8e9192]">
              Track your recently accessed project files, visual layouts, and build log operations history.
            </p>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentProjects />
          </div>
          <div>
            <RecentActivity />
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
