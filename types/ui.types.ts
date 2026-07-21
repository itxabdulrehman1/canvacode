import type { LucideIcon } from 'lucide-react'

// ─── Component Prop Types ────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type InputSize = 'sm' | 'md' | 'lg'
export type InputState = 'default' | 'error' | 'success' | 'disabled'

export type CardVariant = 'default' | 'outlined' | 'filled' | 'ghost'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

// ─── Navigation Types ────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  shortcut?: string
  badge?: string | number
  isActive?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

export interface SidebarSection {
  id: string
  label?: string
  items: NavItem[]
}

// ─── Table Types ─────────────────────────────────────────────────────────────

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string | number
  render?: (value: T[keyof T], row: T) => React.ReactNode
}
