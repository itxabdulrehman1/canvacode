import { create } from 'zustand'
import type { EditorTab, EditorSettings } from '@/types/editor.types'

interface EditorState {
  tabs: EditorTab[]
  activeTabId: string | null
  settings: EditorSettings

  openTab: (tab: EditorTab) => void
  closeTab: (id: string) => void
  setActiveTab: (id: string | null) => void
  updateTabContent: (id: string, content: string) => void
  markTabDirty: (id: string, dirty: boolean) => void
  updateSettings: (settings: Partial<EditorSettings>) => void
}

const defaultSettings: EditorSettings = {
  theme: 'vs-dark',
  fontSize: 14,
  tabSize: 2,
  wordWrap: 'on',
  minimap: false,
  lineNumbers: true,
  formatOnSave: true,
}

export const useEditorStore = create<EditorState>((set) => ({
  tabs: [],
  activeTabId: null,
  settings: defaultSettings,

  openTab: (tab) =>
    set((state) => {
      const exists = state.tabs.find((t) => t.id === tab.id)
      return {
        tabs: exists ? state.tabs : [...state.tabs, tab],
        activeTabId: tab.id,
      }
    }),

  closeTab: (id) =>
    set((state) => {
      const remaining = state.tabs.filter((t) => t.id !== id)
      return {
        tabs: remaining,
        activeTabId:
          state.activeTabId === id
            ? (remaining[remaining.length - 1]?.id ?? null)
            : state.activeTabId,
      }
    }),

  setActiveTab: (id) => set({ activeTabId: id }),

  updateTabContent: (id, content) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, content } : t)),
    })),

  markTabDirty: (id, dirty) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, isDirty: dirty } : t)),
    })),

  updateSettings: (settings) =>
    set((state) => ({ settings: { ...state.settings, ...settings } })),
}))
