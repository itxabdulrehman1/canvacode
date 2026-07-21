import { create } from 'zustand'
import type { UserSettings } from '@/types/settings.types'

const defaultSettings: UserSettings = {
  general: {
    autoSave: true,
    autoSaveInterval: 30,
    showWelcomeScreen: true,
    confirmOnDelete: true,
  },
  appearance: {
    theme: 'dark',
    accentColor: '#3b82f6',
    sidebarPosition: 'left',
    fontSize: 'medium',
    compactMode: false,
  },
  editor: {
    theme: 'vs-dark',
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'on',
    minimap: false,
    lineNumbers: true,
    formatOnSave: true,
  },
  keyboard: {
    keymap: 'default',
    shortcuts: {},
  },
}

interface SettingsState {
  settings: UserSettings
  isDirty: boolean

  updateGeneralSettings: (settings: Partial<UserSettings['general']>) => void
  updateAppearanceSettings: (settings: Partial<UserSettings['appearance']>) => void
  updateEditorSettings: (settings: Partial<UserSettings['editor']>) => void
  updateKeyboardSettings: (settings: Partial<UserSettings['keyboard']>) => void
  resetSettings: () => void
  markClean: () => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: defaultSettings,
  isDirty: false,

  updateGeneralSettings: (updates) =>
    set((state) => ({
      settings: {
        ...state.settings,
        general: { ...state.settings.general, ...updates },
      },
      isDirty: true,
    })),

  updateAppearanceSettings: (updates) =>
    set((state) => ({
      settings: {
        ...state.settings,
        appearance: { ...state.settings.appearance, ...updates },
      },
      isDirty: true,
    })),

  updateEditorSettings: (updates) =>
    set((state) => ({
      settings: {
        ...state.settings,
        editor: { ...state.settings.editor, ...updates },
      },
      isDirty: true,
    })),

  updateKeyboardSettings: (updates) =>
    set((state) => ({
      settings: {
        ...state.settings,
        keyboard: { ...state.settings.keyboard, ...updates },
      },
      isDirty: true,
    })),

  resetSettings: () => set({ settings: defaultSettings, isDirty: false }),
  markClean: () => set({ isDirty: false }),
}))
