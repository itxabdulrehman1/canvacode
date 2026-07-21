'use client'

import { motion } from 'framer-motion'
import { GitBranch, Box, Play, RefreshCw, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { staggerContainer, staggerItem } from '@/animations/variants'

const MOCK_ACTIVITIES = [
  {
    id: '1',
    type: 'commit',
    icon: GitBranch,
    desc: 'Committed structural changes to main branch',
    time: '12m ago',
    project: 'E-Commerce Dashboard',
    color: 'text-blue-400',
  },
  {
    id: '2',
    type: 'build',
    icon: Box,
    desc: 'Built custom auth forms visual components',
    time: '1h ago',
    project: 'Marketing Site v2',
    color: 'text-purple-400',
  },
  {
    id: '3',
    type: 'preview',
    icon: Play,
    desc: 'Started workspace local preview environment',
    time: '3h ago',
    project: 'Admin Portal',
    color: 'text-green-400',
  },
  {
    id: '4',
    type: 'sync',
    icon: RefreshCw,
    desc: 'Synchronized visual node blueprints schema',
    time: '1d ago',
    project: 'Mobile App Backend',
    color: 'text-amber-400',
  },
]

export function RecentActivity() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-[#e5e2e1]">Recent Activity</h2>
      <Card noPadding className="flex-1 min-h-[300px]">
        <motion.div
          className="flex flex-col p-2 divide-y divide-[#1c1b1b]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {MOCK_ACTIVITIES.map((act) => {
            const Icon = act.icon
            return (
              <motion.div
                key={act.id}
                variants={staggerItem}
                className="flex items-start gap-3 p-3 hover:bg-[#201f1f] rounded-md transition-colors"
              >
                <div className={`h-7 w-7 rounded-md bg-[#0e0e0e] border border-[#353434] flex items-center justify-center shrink-0 ${act.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#e5e2e1] truncate">{act.desc}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                      {act.project}
                    </span>
                    <span className="text-[10px] text-[#444748]">•</span>
                    <span className="text-[10px] text-[#8e9192]">{act.time}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Card>
    </div>
  )
}
