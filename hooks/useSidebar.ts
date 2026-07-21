'use client'

import { useUIStore } from '@/stores/uiStore'
import { useKeyboardShortcut } from './useKeyboardShortcut'

export function useSidebar() {
  const { isSidebarExpanded, toggleSidebar, setSidebarExpanded } = useUIStore()

  useKeyboardShortcut('b', toggleSidebar, { meta: true })

  return {
    isExpanded: isSidebarExpanded,
    toggle: toggleSidebar,
    expand: () => setSidebarExpanded(true),
    collapse: () => setSidebarExpanded(false),
  }
}
