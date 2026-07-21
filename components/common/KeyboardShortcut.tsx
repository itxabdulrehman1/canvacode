'use client'

import { cn } from '@/lib/utils'

interface KeyboardShortcutProps {
  keys: string[]
  className?: string
}

export function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center gap-0.5 rounded border border-[#444748] bg-[#2a2a2a] px-1.5 py-0.5 text-[10px] font-mono font-medium text-[#8e9192] select-none',
        className
      )}
    >
      {keys.map((key, i) => {
        let displayKey = key
        if (key.toLowerCase() === 'meta' || key.toLowerCase() === 'command' || key === '⌘') {
          displayKey = '⌘'
        } else if (key.toLowerCase() === 'shift' || key === '⇧') {
          displayKey = '⇧'
        } else if (key.toLowerCase() === 'alt' || key.toLowerCase() === 'option' || key === '⌥') {
          displayKey = '⌥'
        } else if (key.toLowerCase() === 'ctrl' || key.toLowerCase() === 'control' || key === '⌃') {
          displayKey = '⌃'
        } else if (key.toLowerCase() === 'enter' || key === '↵') {
          displayKey = '↵'
        }

        return <span key={i}>{displayKey}</span>
      })}
    </kbd>
  )
}
