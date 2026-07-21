'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/animations/variants'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: { value: number; direction: 'up' | 'down' }
  color?: 'blue' | 'green' | 'amber' | 'purple'
}

const colorMap = {
  blue: {
    icon: 'text-blue-400',
    bg: 'bg-blue-600/10',
    border: 'border-blue-500/20',
    trend: 'text-blue-400',
  },
  green: {
    icon: 'text-green-400',
    bg: 'bg-green-600/10',
    border: 'border-green-500/20',
    trend: 'text-green-400',
  },
  amber: {
    icon: 'text-amber-400',
    bg: 'bg-amber-600/10',
    border: 'border-amber-500/20',
    trend: 'text-amber-400',
  },
  purple: {
    icon: 'text-purple-400',
    bg: 'bg-purple-600/10',
    border: 'border-purple-500/20',
    trend: 'text-purple-400',
  },
}

function StatCard({ label, value, icon: Icon, trend, color = 'blue' }: StatCardProps) {
  const colors = colorMap[color]

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        'flex flex-col gap-3 p-4 rounded-lg border bg-[#1c1b1b]',
        colors.border
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#8e9192]">{label}</span>
        <div className={cn('h-8 w-8 rounded-md flex items-center justify-center', colors.bg)}>
          <Icon className={cn('h-4 w-4', colors.icon)} aria-hidden="true" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-semibold text-[#e5e2e1] leading-none">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              'text-xs mb-0.5',
              trend.direction === 'up' ? 'text-green-400' : 'text-red-400'
            )}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </motion.div>
  )
}

export { StatCard }
export type { StatCardProps }
