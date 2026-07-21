'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { TemplatesSection } from '@/components/dashboard/TemplatesSection'
import { staggerContainer, staggerItem } from '@/animations/variants'

export default function TemplatesPage() {
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
            <h1 className="text-xl font-bold text-[#e5e2e1]">Templates Library</h1>
            <p className="text-xs text-[#8e9192]">
              Choose from our curated visual boilerplate layouts to kickstart your desktop or web workspace.
            </p>
          </div>
        </motion.div>

        <motion.div variants={staggerItem}>
          <TemplatesSection />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
