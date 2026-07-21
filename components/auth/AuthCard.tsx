'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { scaleIn } from '@/animations/variants'
import { transitionDefault } from '@/animations/transitions'

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={transitionDefault}
      className={cn(
        'w-full max-w-[400px] rounded-xl border border-[#353434] bg-[#1c1b1b]/80 backdrop-blur-md shadow-2xl p-6 relative overflow-hidden',
        className
      )}
    >
      {/* Background soft glow decoration */}
      <div
        className="absolute -top-24 -left-24 h-48 w-48 rounded-full blur-[64px] bg-blue-500/10 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col gap-5">
        {children}
      </div>
    </motion.div>
  )
}
