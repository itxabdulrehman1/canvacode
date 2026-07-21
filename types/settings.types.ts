import type { ThemeMode } from './app.types'
import type { EditorSettings } from './editor.types'

// ─── Settings Types ───────────────────────────────────────────────────────────

export interface GeneralSettings {
  autoSave: boolean
  autoSaveInterval: number
  showWelcomeScreen: boolean
  confirmOnDelete: boolean
}

export interface AppearanceSettings {
  theme: ThemeMode
  accentColor: string
  sidebarPosition: 'left' | 'right'
  fontSize: 'small' | 'medium' | 'large'
  compactMode: boolean
}

export interface KeyboardSettings {
  keymap: 'default' | 'vim' | 'emacs'
  shortcuts: Record<string, string>
}

export interface UserSettings {
  general: GeneralSettings
  appearance: AppearanceSettings
  editor: EditorSettings
  keyboard: KeyboardSettings
}
