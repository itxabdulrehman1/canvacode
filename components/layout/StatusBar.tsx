'use client'

import { GitBranch, Wifi, CheckCircle, Clock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusBarProps {
  className?: string
}

export function StatusBar({ className }: StatusBarProps) {
  return (
    <footer
      className={cn(
        'flex items-center justify-between h-6 px-3 shrink-0',
        'bg-blue-600 text-white text-[10px] font-medium select-none',
        className
      )}
      aria-label="Status bar"
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded transition-colors">
          <GitBranch className="h-3 w-3" aria-hidden="true" />
          main
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-300" aria-hidden="true" />
          No problems
        </span>
      </div>

      {/* Center */}
      <div className="flex items-center gap-1 opacity-70">
        <Zap className="h-3 w-3" aria-hidden="true" />
        CanvasCode v0.1.0
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" aria-hidden="true" />
          Idle
        </span>
        <span className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-1 rounded transition-colors">
          <Wifi className="h-3 w-3" aria-hidden="true" />
          Connected
        </span>
        <span>UTF-8</span>
        <span>TypeScript</span>
      </div>
    </footer>
  )
}
