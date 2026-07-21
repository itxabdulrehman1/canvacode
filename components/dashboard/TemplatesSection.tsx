'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Layers, FileCode, Cpu, User, FileText, Monitor, ShoppingBag, Database, LayoutGrid } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { useUIStore } from '@/stores/uiStore'
import { staggerContainer, staggerItem } from '@/animations/variants'

interface TemplateInfo {
  name: string
  description: string
  frameworks: string[]
  icon: any
}

const MOCK_TEMPLATES: TemplateInfo[] = [
  {
    name: 'Blank Project',
    description: 'Fresh slate project with styled layout primitives and tailwind tokens initialized.',
    frameworks: ['React', 'Next.js', 'Vue', 'Svelte', 'Electron'],
    icon: FileCode,
  },
  {
    name: 'Admin Dashboard',
    description: 'Ready-to-use admin panel featuring user management tables, charts, and metrics widgets.',
    frameworks: ['Next.js', 'React', 'Vue'],
    icon: LayoutGrid,
  },
  {
    name: 'SaaS App',
    description: 'Standard multi-tenant SaaS layout containing stripe pricing card layouts and sidebar grids.',
    frameworks: ['React', 'Next.js'],
    icon: Cpu,
  },
  {
    name: 'CRM Dashboard',
    description: 'Sales monitoring terminal with calendar schedules, contact columns, and messaging panels.',
    frameworks: ['Next.js', 'React'],
    icon: Database,
  },
  {
    name: 'E-Commerce Store',
    description: 'Visual shopping cart layouts with dynamic payment checkout cards and product grids.',
    frameworks: ['Vue', 'React'],
    icon: ShoppingBag,
  },
  {
    name: 'Portfolio Website',
    description: 'Clean personal template for developers to showcase case studies, resume forms, and skill blocks.',
    frameworks: ['Next.js', 'React', 'Svelte'],
    icon: User,
  },
  {
    name: 'Blog Webpage',
    description: 'Minimal writing template with markdown index layouts and responsive reader layout columns.',
    frameworks: ['Next.js', 'React', 'Svelte'],
    icon: FileText,
  },
  {
    name: 'Landing Page',
    description: 'Sleek marketing page layout with heroes, feature grids, FAQ collapsibles, and conversion buttons.',
    frameworks: ['React', 'Next.js', 'Vue', 'Svelte'],
    icon: Monitor,
  },
]

export function TemplatesSection() {
  const { openCreateProject } = useUIStore()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5 pb-1">
        <Layers className="h-4 w-4 text-blue-400" />
        <h2 className="text-sm font-semibold text-[#e5e2e1]">Project Templates</h2>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {MOCK_TEMPLATES.map((tpl) => {
          const Icon = tpl.icon
          return (
            <motion.div key={tpl.name} variants={staggerItem}>
              <Card
                onClick={openCreateProject}
                className="cursor-pointer group relative border-[#262525] bg-[#100f0f] hover:border-[#444748] hover:bg-[#181717] transition-all duration-150 text-left h-full"
                noPadding
              >
                <div className="p-3.5 flex flex-col gap-2.5 h-full">
                  {/* Template header icon area */}
                  <div className="h-10 w-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/20 transition-all duration-200">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-xs font-bold text-[#e5e2e1] group-hover:text-blue-400 transition-colors">
                      {tpl.name}
                    </h3>
                    <p className="text-[10px] text-[#8e9192] leading-relaxed line-clamp-2">
                      {tpl.description}
                    </p>
                  </div>

                  {/* Framework tags */}
                  <div className="flex flex-wrap gap-1 mt-1 pt-2 border-t border-[#1c1b1b]">
                    {tpl.frameworks.map((fw) => (
                      <span
                        key={fw}
                        className="text-[8px] font-semibold text-[#8e9192] px-1 bg-[#1c1b1b] rounded border border-[#262525]"
                      >
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
