// ─── Application Constants ────────────────────────────────────────────────────

export const APP_NAME = 'CanvasCode'
export const APP_VERSION = '0.1.0'
export const APP_DESCRIPTION = 'AI-native Visual Full-Stack IDE'
export const APP_TAGLINE = 'Design. Orchestrate. Ship.'

// ─── View Modes ──────────────────────────────────────────────────────────────

export const VIEW_MODES = {
  UI: 'ui',
  BACKEND: 'backend',
} as const

// ─── Panel Sizes ─────────────────────────────────────────────────────────────

export const PANEL_SIZES = {
  SIDEBAR_COLLAPSED: 48,
  SIDEBAR_EXPANDED: 240,
  INSPECTOR_WIDTH: 280,
  STATUS_BAR_HEIGHT: 24,
  TITLE_BAR_HEIGHT: 40,
  TOOLBAR_HEIGHT: 40,
} as const

// ─── Z-Index Layers ──────────────────────────────────────────────────────────

export const Z_INDEX = {
  BASE: 0,
  SIDEBAR: 10,
  TOOLBAR: 20,
  DROPDOWN: 50,
  MODAL_BACKDROP: 80,
  MODAL: 90,
  TOAST: 100,
  COMMAND_PALETTE: 110,
} as const

// ─── Animation Durations (ms) ────────────────────────────────────────────────

export const DURATION = {
  FAST: 150,
  DEFAULT: 200,
  SLOW: 300,
  VERY_SLOW: 500,
} as const
