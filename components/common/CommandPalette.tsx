'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Command, Search } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { fadeIn, scaleIn } from '@/animations/variants'
import { transitionDefault } from '@/animations/transitions'

const PLACEHOLDER_COMMANDS = [
  { group: 'Navigation', label: 'Go to Dashboard', shortcut: ['⌘', 'D'] },
  { group: 'Navigation', label: 'Open Workspace', shortcut: ['⌘', 'W'] },
  { group: 'Navigation', label: 'Open Settings', shortcut: ['⌘', ','] },
  { group: 'Actions', label: 'New Project', shortcut: ['⌘', 'N'] },
  { group: 'Actions', label: 'Save Project', shortcut: ['⌘', 'S'] },
  { group: 'Actions', label: 'Toggle Sidebar', shortcut: ['⌘', 'B'] },
  { group: 'View', label: 'Toggle Theme', shortcut: ['⌘', 'Shift', 'T'] },
  { group: 'View', label: 'Zoom In', shortcut: ['⌘', '+'] },
  { group: 'View', label: 'Zoom Out', shortcut: ['⌘', '-'] },
]

const groups = Array.from(new Set(PLACEHOLDER_COMMANDS.map((c) => c.group)))

export function CommandPalette() {
  const { isCommandPaletteOpen, closeCommandPalette } = useUIStore()

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh]">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transitionDefault}
            onClick={closeCommandPalette}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="relative w-full max-w-[560px] mx-4 rounded-xl border border-[#444748] bg-[#1c1b1b] shadow-2xl shadow-black/70 overflow-hidden"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transitionDefault}
          >
            {/* Search input */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#353434]">
              <Search className="h-4 w-4 text-[#8e9192] shrink-0" aria-hidden="true" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-[#e5e2e1] placeholder:text-[#444748] focus:outline-none"
              />
              <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-[#444748] px-1.5 py-0.5 text-[10px] text-[#8e9192]">
                ESC
              </kbd>
            </div>

            {/* Commands list */}
            <div className="max-h-[360px] overflow-y-auto py-2">
              {groups.map((group) => (
                <div key={group}>
                  <div className="px-4 py-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#444748]">
                      {group}
                    </span>
                  </div>
                  {PLACEHOLDER_COMMANDS.filter((c) => c.group === group).map(
                    (command) => (
                      <button
                        key={command.label}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#c4c7c8] hover:bg-[#2a2a2a] hover:text-[#e5e2e1] transition-colors"
                        onClick={closeCommandPalette}
                      >
                        <div className="flex items-center gap-2.5">
                          <Command className="h-3.5 w-3.5 text-[#8e9192]" aria-hidden="true" />
                          {command.label}
                        </div>
                        <div className="flex items-center gap-1">
                          {command.shortcut.map((key, i) => (
                            <kbd
                              key={i}
                              className="rounded border border-[#444748] px-1.5 py-0.5 text-[10px] text-[#8e9192] bg-[#2a2a2a]"
                            >
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </button>
                    )
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-[#353434] px-4 py-2 flex items-center gap-4">
              <span className="text-[10px] text-[#444748]">
                ↑↓ navigate · Enter select · Esc close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
