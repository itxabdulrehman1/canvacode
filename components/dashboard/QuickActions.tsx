'use client'

import { motion } from 'framer-motion'
import { Plus, FolderOpen, GitFork, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { staggerContainer, staggerItem } from '@/animations/variants'

const ACTIONS = [
  {
    id: 'new-project',
    label: 'New Project',
    description: 'Start from scratch',
    icon: Plus,
    variant: 'primary' as const,
  },
  {
    id: 'open-project',
    label: 'Open Project',
    description: 'Open existing project',
    icon: FolderOpen,
    variant: 'secondary' as const,
  },
  {
    id: 'fork-template',
    label: 'Use Template',
    description: 'Browse templates',
    icon: GitFork,
    variant: 'secondary' as const,
  },
  {
    id: 'ai-generate',
    label: 'AI Generate',
    description: 'Generate with AI',
    icon: Sparkles,
    variant: 'ghost' as const,
  },
]

export function QuickActions() {
  return (
    <motion.div
      className="flex items-center gap-2 flex-wrap"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {ACTIONS.map((action) => {
        const Icon = action.icon
        return (
          <motion.div key={action.id} variants={staggerItem}>
            <Button
              variant={action.variant}
              size="sm"
              leftIcon={<Icon className="h-3.5 w-3.5" />}
              title={action.description}
            >
              {action.label}
            </Button>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
