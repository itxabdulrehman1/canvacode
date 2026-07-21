'use client'

import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import { SettingsLayout } from '@/layouts/SettingsLayout'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { ThemeSettings } from '@/components/settings/ThemeSettings'
import { staggerContainer, staggerItem } from '@/animations/variants'

export default function AppearanceSettingsPage() {
  return (
    <SettingsLayout>
      <motion.div
        className="p-6 flex flex-col gap-6 max-w-2xl"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem}>
          <SectionHeader
            title="Appearance Settings"
            description="Customize how CanvasCode IDE looks on your machine"
          />
        </motion.div>

        <motion.div variants={staggerItem}>
          <ThemeSettings />
        </motion.div>

        {/* Save button */}
        <motion.div variants={staggerItem} className="flex justify-end">
          <Button
            variant="primary"
            leftIcon={<Save className="h-3.5 w-3.5" />}
          >
            Save changes
          </Button>
        </motion.div>
      </motion.div>
    </SettingsLayout>
  )
}
