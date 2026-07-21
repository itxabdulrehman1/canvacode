/**
 * CanvasCode Design Tokens
 * Single source of truth for all design decisions.
 */

// ─── Colors ───────────────────────────────────────────────────────────────────

export const colors = {
  // Surfaces
  bg: '#141313',
  surface: {
    lowest: '#0e0e0e',
    low: '#1c1b1b',
    default: '#201f1f',
    high: '#2a2a2a',
    highest: '#353434',
  },
  // Text
  text: {
    primary: '#e5e2e1',
    secondary: '#c4c7c8',
    muted: '#8e9192',
    faint: '#444748',
  },
  // Outline
  border: {
    subtle: '#1c1b1b',
    default: '#353434',
    strong: '#444748',
    muted: '#8e9192',
  },
  // Accent (blue)
  accent: {
    default: '#3b82f6',
    hover: '#2563eb',
    dim: '#1d4ed8',
    muted: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.25)',
  },
  // Semantic
  semantic: {
    success: '#22c55e',
    successMuted: 'rgba(34,197,94,0.15)',
    warning: '#f59e0b',
    warningMuted: 'rgba(245,158,11,0.15)',
    error: '#ef4444',
    errorMuted: 'rgba(239,68,68,0.15)',
    info: '#3b82f6',
    infoMuted: 'rgba(59,130,246,0.15)',
  },
} as const

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  family: {
    sans: "'Geist', system-ui, sans-serif",
    mono: "'JetBrains Mono', Menlo, monospace",
  },
  size: {
    xs: '11px',
    sm: '12px',
    base: '13px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: '1.2',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
} as const

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const

// ─── Border Radius ────────────────────────────────────────────────────────────

export const radius = {
  none: '0px',
  sm: '2px',
  default: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadows = {
  none: 'none',
  panel: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.24)',
  floating: '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)',
  modal: '0 24px 64px rgba(0,0,0,0.7)',
  glowBlue: '0 0 20px rgba(59,130,246,0.25)',
} as const

// ─── Animation ────────────────────────────────────────────────────────────────

export const animation = {
  duration: {
    instant: 0,
    fast: 150,
    default: 200,
    slow: 300,
    verySlow: 500,
  },
  easing: {
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: { type: 'spring', stiffness: 400, damping: 35 },
  },
} as const

// ─── Panel Sizes ──────────────────────────────────────────────────────────────

export const panelSizes = {
  titleBar: 40,
  toolbar: 40,
  sidebarCollapsed: 48,
  sidebarExpanded: 240,
  inspectorWidth: 288,
  statusBar: 24,
} as const
