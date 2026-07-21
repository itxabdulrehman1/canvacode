import { APP_NAME, APP_VERSION } from '@/lib/constants'

export { APP_NAME, APP_VERSION }

// ─── Supported Frameworks ────────────────────────────────────────────────────

export const FRAMEWORKS = [
  { id: 'next', label: 'Next.js', icon: '▲' },
  { id: 'react', label: 'React', icon: '⚛' },
  { id: 'vue', label: 'Vue', icon: '◈' },
  { id: 'svelte', label: 'Svelte', icon: '◆' },
  { id: 'astro', label: 'Astro', icon: '🚀' },
] as const

// ─── Project Status Labels ────────────────────────────────────────────────────

export const PROJECT_STATUS_LABELS = {
  draft: 'Draft',
  active: 'Active',
  archived: 'Archived',
  published: 'Published',
} as const

// ─── Max limits ───────────────────────────────────────────────────────────────

export const MAX_RECENT_PROJECTS = 10
export const MAX_NOTIFICATIONS = 50
export const MAX_EDITOR_TABS = 20
