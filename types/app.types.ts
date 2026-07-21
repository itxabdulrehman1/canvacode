// ─── View & Navigation Types ─────────────────────────────────────────────────

export type ViewMode = 'ui' | 'backend'

export type AppPage =
  | 'dashboard'
  | 'workspace'
  | 'settings'
  | 'about'
  | 'login'
  | 'register'

export type ThemeMode = 'dark' | 'light' | 'system'

export type PanelSide = 'left' | 'right' | 'bottom'

export interface PanelState {
  isOpen: boolean
  width: number
  side: PanelSide
}

// ─── Notification Types ──────────────────────────────────────────────────────

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  timestamp: number
  read: boolean
}

// ─── Command Palette Types ───────────────────────────────────────────────────

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: string
  shortcut?: string[]
  group?: string
  action: () => void
}

// ─── Status Bar Types ────────────────────────────────────────────────────────

export type StatusBarItem = {
  id: string
  label: string
  icon?: string
  side: 'left' | 'right'
  onClick?: () => void
}
