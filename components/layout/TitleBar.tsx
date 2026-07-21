'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/common/Logo'
import { NotificationBell } from '@/components/common/NotificationBell'
import { useUIStore } from '@/stores/uiStore'
import { useAuthStore } from '@/stores/authStore'
import { Command, Minimize2, Maximize2, X, Plus, Settings, Sun, Moon } from 'lucide-react'

interface TitleBarProps {
  className?: string
}

export function TitleBar({ className }: TitleBarProps) {
  const router = useRouter()
  const { openCommandPalette, openCreateProject, theme, setTheme } = useUIStore()
  const { userName } = useAuthStore()

  const handleSettingsClick = () => {
    router.push('/settings')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header
      className={cn(
        'flex items-center justify-between h-12 px-4 shrink-0',
        'bg-[#0a0a0a] border-b border-[#1c1b1b]',
        'select-none z-50',
        className
      )}
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Left — Logo & Brand */}
      <div className="flex items-center gap-3" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <Logo size="sm" />
        <span className="hidden md:inline text-xs font-semibold tracking-wide text-[#8e9192]">
          CanvasCode
        </span>
      </div>

      {/* Center — Command Palette / Search Trigger */}
      <div className="flex items-center gap-2" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <button
          onClick={openCommandPalette}
          className="flex items-center gap-2 h-7 px-4 w-64 md:w-80 rounded-md border border-[#262525] bg-[#141313] text-[#8e9192] hover:text-[#e5e2e1] hover:border-[#353434] transition-all duration-150 text-xs text-left"
          aria-label="Open command palette"
        >
          <Command className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="flex-1 text-[#8e9192]">Search projects, files or actions...</span>
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-[#444748] bg-[#1c1b1b] border border-[#2a2929] px-1 rounded">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </button>

        {/* New Project Button */}
        <button
          onClick={openCreateProject}
          className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors duration-150 shadow-sm"
          title="Create New Project"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Project</span>
        </button>
      </div>

      {/* Right — Actions & User Badge */}
      <div
        className="flex items-center gap-2 md:gap-3"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-1 rounded-md text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Settings button */}
        <button
          onClick={handleSettingsClick}
          className="p-1 rounded-md text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>

        {/* Notification Bell */}
        <NotificationBell />

        {/* User profile avatar badge */}
        {userName && (
          <div className="flex items-center gap-2 pl-2 border-l border-[#1c1b1b]">
            <div className="h-6 w-6 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[10px] font-bold text-blue-400">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-[#e5e2e1]">
              {userName}
            </span>
          </div>
        )}

        {/* Electron Window Control Buttons */}
        <div className="ml-2 hidden electron:flex items-center gap-1">
          <button
            className="h-3 w-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity"
            aria-label="Minimize"
          >
            <Minimize2 className="h-2 w-2 text-[#8a6200] opacity-0 hover:opacity-100" />
          </button>
          <button
            className="h-3 w-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity"
            aria-label="Maximize"
          >
            <Maximize2 className="h-2 w-2 text-[#006500] opacity-0 hover:opacity-100" />
          </button>
          <button
            className="h-3 w-3 rounded-full bg-[#ff5f57] hover:opacity-80 transition-opacity"
            aria-label="Close"
          >
            <X className="h-2 w-2 text-[#6e0000] opacity-0 hover:opacity-100" />
          </button>
        </div>
      </div>
    </header>
  )
}
