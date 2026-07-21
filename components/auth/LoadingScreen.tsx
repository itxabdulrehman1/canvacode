'use client'

import { motion } from 'framer-motion'
import { Spinner } from '@/components/ui/Spinner'
import { Logo } from '@/components/common/Logo'

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = 'Loading workspace preferences…' }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0e0e0e] gap-6">
      {/* Background soft grids */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#2a2a2a 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-center gap-4 text-center"
      >
        <Logo size="lg" showText={false} className="animate-pulse" />
        <div className="flex flex-col gap-1">
          <Spinner size="md" />
          <p className="text-xs text-[#8e9192] animate-pulse mt-2">{message}</p>
        </div>
      </motion.div>
    </div>
  )
}
