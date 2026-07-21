'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-0.5 bg-[#1c1b1b] border border-[#353434] rounded-lg p-0.5">
      {(['light', 'dark', 'system'] as const).map((t) => {
        const isActive = theme === t
        const Icon = {
          light: Sun,
          dark: Moon,
          system: Monitor,
        }[t]

        return (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`relative p-1.5 rounded-md text-xs transition-colors ${
              isActive
                ? 'text-[#e5e2e1]'
                : 'text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#201f1f]'
            }`}
            title={`Switch to ${t} theme`}
            aria-label={`Switch to ${t} theme`}
          >
            {isActive && (
              <motion.div
                layoutId="active-theme-bg"
                className="absolute inset-0 bg-[#2a2a2a] border border-[#444748] rounded-md -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="h-3.5 w-3.5" />
          </button>
        )
      })}
    </div>
  )
}
