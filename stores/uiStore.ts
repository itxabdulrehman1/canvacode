import { create } from 'zustand'
import type { PanelState, ThemeMode } from '@/types/app.types'

interface UIState {
  theme: ThemeMode
  isSidebarExpanded: boolean
  isCommandPaletteOpen: boolean
  isRightPanelOpen: boolean
  isBottomPanelOpen: boolean
  isCreateProjectOpen: boolean
  renameProjectId: string | null
  deleteProjectId: string | null
  activeTab: string | null
  leftPanel: PanelState
  rightPanel: PanelState

  setTheme: (theme: ThemeMode) => void
  toggleSidebar: () => void
  setSidebarExpanded: (value: boolean) => void
  openCommandPalette: () => void
  closeCommandPalette: () => void
  toggleCommandPalette: () => void
  openCreateProject: () => void
  closeCreateProject: () => void
  setRenameProjectId: (id: string | null) => void
  setDeleteProjectId: (id: string | null) => void
  setRightPanelOpen: (value: boolean) => void
  setBottomPanelOpen: (value: boolean) => void
  setActiveTab: (tab: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  isSidebarExpanded: true,
  isCommandPaletteOpen: false,
  isRightPanelOpen: true,
  isBottomPanelOpen: false,
  isCreateProjectOpen: false,
  renameProjectId: null,
  deleteProjectId: null,
  activeTab: null,

  leftPanel: { isOpen: true, width: 240, side: 'left' },
  rightPanel: { isOpen: true, width: 280, side: 'right' },

  setTheme: (theme) => set({ theme }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
  setSidebarExpanded: (value) => set({ isSidebarExpanded: value }),
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toggleCommandPalette: () =>
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  openCreateProject: () => set({ isCreateProjectOpen: true }),
  closeCreateProject: () => set({ isCreateProjectOpen: false }),
  setRenameProjectId: (id) => set({ renameProjectId: id }),
  setDeleteProjectId: (id) => set({ deleteProjectId: id }),
  setRightPanelOpen: (value) => set({ isRightPanelOpen: value }),
  setBottomPanelOpen: (value) => set({ isBottomPanelOpen: value }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
