'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { slideInUp } from '@/animations/variants'
import { transitionDefault } from '@/animations/transitions'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0e0e0e]">
      {/* Background dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#2a2a2a 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative flex flex-col items-center gap-6 text-center px-6"
        variants={slideInUp}
        initial="hidden"
        animate="visible"
        transition={transitionDefault}
      >
        {/* 404 */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-8xl font-bold text-[#1c1b1b] select-none" aria-hidden="true">
            404
          </span>
          <div className="absolute flex flex-col items-center gap-2 top-1/2 -translate-y-1/2">
            <div className="h-14 w-14 rounded-2xl bg-[#201f1f] border border-[#353434] flex items-center justify-center">
              <span className="text-2xl" aria-hidden="true">🔍</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl font-semibold text-[#e5e2e1]">Page not found</h1>
          <p className="text-sm text-[#8e9192] max-w-xs">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
            onClick={() => window.history.back()}
          >
            Go back
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Home className="h-3.5 w-3.5" />}
            onClick={() => window.location.href = '/dashboard'}
          >
            Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
