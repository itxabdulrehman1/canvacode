// ─── Route Paths ──────────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  WORKSPACE: '/workspace',
  SETTINGS: '/settings',
  SETTINGS_APPEARANCE: '/settings/appearance',
  SETTINGS_EDITOR: '/settings/editor',
  SETTINGS_KEYBOARD: '/settings/keyboard',
  ABOUT: '/about',
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]
