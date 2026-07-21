'use client'

import { useUIStore } from '@/stores/uiStore'
import { useKeyboardShortcut } from './useKeyboardShortcut'

export function useCommandPalette() {
  const { isCommandPaletteOpen, openCommandPalette, closeCommandPalette, toggleCommandPalette } =
    useUIStore()

  useKeyboardShortcut('k', toggleCommandPalette, { meta: true })

  return {
    isOpen: isCommandPaletteOpen,
    open: openCommandPalette,
    close: closeCommandPalette,
    toggle: toggleCommandPalette,
  }
}
