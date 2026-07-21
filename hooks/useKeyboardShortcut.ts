'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/stores/uiStore'

interface ShortcutOptions {
  meta?: boolean
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
}

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: ShortcutOptions = {}
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const { meta = false, ctrl = false, shift = false, alt = false } = options
      const metaMatch = meta ? e.metaKey || e.ctrlKey : true
      const ctrlMatch = ctrl ? e.ctrlKey : true
      const shiftMatch = shift ? e.shiftKey : !e.shiftKey || shift === undefined
      const altMatch = alt ? e.altKey : !e.altKey || alt === undefined

      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        (meta ? e.metaKey || e.ctrlKey : !e.metaKey && !e.ctrlKey) &&
        (shift ? e.shiftKey : !e.shiftKey) &&
        (alt ? e.altKey : !e.altKey)
      ) {
        e.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback, options])
}
