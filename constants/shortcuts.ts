// ─── Keyboard Shortcuts ───────────────────────────────────────────────────────

export const SHORTCUTS = {
  COMMAND_PALETTE: { key: 'k', meta: true, label: '⌘K' },
  TOGGLE_SIDEBAR: { key: 'b', meta: true, label: '⌘B' },
  NEW_PROJECT: { key: 'n', meta: true, label: '⌘N' },
  SAVE: { key: 's', meta: true, label: '⌘S' },
  SETTINGS: { key: ',', meta: true, label: '⌘,' },
  SEARCH: { key: 'p', meta: true, label: '⌘P' },
  UNDO: { key: 'z', meta: true, label: '⌘Z' },
  REDO: { key: 'z', meta: true, shift: true, label: '⌘⇧Z' },
  ZOOM_IN: { key: '=', meta: true, label: '⌘+' },
  ZOOM_OUT: { key: '-', meta: true, label: '⌘-' },
  FIT_VIEW: { key: '1', shift: true, label: '⇧1' },
} as const
