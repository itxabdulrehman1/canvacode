'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/animations/variants'
import { transitionPage } from '@/animations/transitions'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0e0e0e]">
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-[#141313] border-r border-[#1c1b1b]">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#2a2a2a 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />

        {/* Blue glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-[128px] opacity-15"
          style={{ background: '#3b82f6' }}
          aria-hidden="true"
        />

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-12">
          <div className="text-center">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              AI-native IDE
            </p>
            <h2 className="text-3xl font-semibold text-[#e5e2e1] leading-snug">
              Design. Orchestrate.
              <br />
              <span className="text-[#8e9192]">Ship.</span>
            </h2>
            <p className="mt-3 text-sm text-[#8e9192] max-w-xs">
              Build production-grade full-stack apps visually — no context switching required.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {['UI Canvas', 'Blueprint Engine', 'AI Copilot', 'One-click Deploy'].map((feat) => (
              <span
                key={feat}
                className="px-3 py-1 rounded-full border border-[#353434] bg-[#1c1b1b] text-xs text-[#8e9192]"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right auth form panel */}
      <motion.div
        className="flex flex-col items-center justify-center flex-1 lg:max-w-md p-8"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={transitionPage}
      >
        {children}
      </motion.div>
    </div>
  )
}
