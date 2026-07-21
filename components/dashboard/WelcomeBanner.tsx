'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { fadeIn } from '@/animations/variants'
import { transitionDefault } from '@/animations/transitions'

interface WelcomeBannerProps {
  userName?: string
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  const greeting = getGreeting()

  return (
    <motion.div
      className="relative rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-[#1c1b1b] to-[#1c1b1b] p-5 overflow-hidden"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={transitionDefault}
    >
      {/* Background decoration */}
      <div
        className="absolute right-0 top-0 bottom-0 w-48 opacity-5"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at right center, #3b82f6 0%, transparent 70%)',
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" aria-hidden="true" />
            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
              AI-native IDE
            </span>
          </div>
          <h1 className="text-lg font-semibold text-[#e5e2e1]">
            {greeting}{userName ? `, ${userName}` : ''}
          </h1>
          <p className="text-xs text-[#8e9192] max-w-sm">
            Design stunning UIs on the canvas, orchestrate backend logic in the Blueprint, and ship production-ready apps — all from one workspace.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          className="shrink-0"
        >
          Open Workspace
        </Button>
      </div>
    </motion.div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}
