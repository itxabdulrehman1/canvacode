'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Logo } from '@/components/common/Logo'

interface WelcomeScreenProps {
  userName?: string
  onComplete: () => void
}

export function WelcomeScreen({ userName, onComplete }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0e0e0e] gap-6"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#2a2a2a 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      {/* Decorative center glow */}
      <div
        className="absolute h-96 w-96 rounded-full blur-[128px] opacity-10 bg-blue-500"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="relative z-10 flex flex-col items-center gap-4 text-center px-6"
      >
        <div className="h-14 w-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-blue-400" />
        </div>

        <div className="flex flex-col gap-1.5 mt-2">
          <h1 className="text-xl font-semibold text-[#e5e2e1]">
            Welcome to CanvasCode{userName ? `, ${userName}` : ''}
          </h1>
          <p className="text-xs text-[#8e9192] max-w-xs leading-normal">
            Initializing your Visual Full-Stack Studio workspace...
          </p>
        </div>

        {/* Small progress bar animation */}
        <div className="w-36 h-1 bg-[#201f1f] rounded-full overflow-hidden mt-3 border border-[#353434]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="h-full bg-blue-500"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
