import { create } from 'zustand'
import type { CanvasElement, CanvasPage, SelectionState } from '@/types/canvas.types'

interface CanvasState {
  pages: CanvasPage[]
  activePageId: string | null
  selection: SelectionState
  zoom: number
  pan: { x: number; y: number }
  isGridVisible: boolean
  isSnapEnabled: boolean

  setActivePageId: (id: string | null) => void
  setSelection: (selection: Partial<SelectionState>) => void
  clearSelection: () => void
  setZoom: (zoom: number) => void
  setPan: (pan: { x: number; y: number }) => void
  toggleGrid: () => void
  toggleSnap: () => void
  addElement: (element: CanvasElement, pageId: string) => void
  removeElement: (elementId: string, pageId: string) => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  pages: [],
  activePageId: null,
  selection: { selectedIds: [], hoveredId: null },
  zoom: 1,
  pan: { x: 0, y: 0 },
  isGridVisible: true,
  isSnapEnabled: true,

  setActivePageId: (id) => set({ activePageId: id }),
  setSelection: (selection) =>
    set((state) => ({ selection: { ...state.selection, ...selection } })),
  clearSelection: () =>
    set({ selection: { selectedIds: [], hoveredId: null } }),
  setZoom: (zoom) => set({ zoom }),
  setPan: (pan) => set({ pan }),
  toggleGrid: () => set((state) => ({ isGridVisible: !state.isGridVisible })),
  toggleSnap: () => set((state) => ({ isSnapEnabled: !state.isSnapEnabled })),
  addElement: (element, pageId) =>
    set((state) => ({
      pages: state.pages.map((p) =>
        p.id === pageId
          ? { ...p, elements: [...p.elements, element] }
          : p
      ),
    })),
  removeElement: (elementId, pageId) =>
    set((state) => ({
      pages: state.pages.map((p) =>
        p.id === pageId
          ? { ...p, elements: p.elements.filter((e) => e.id !== elementId) }
          : p
      ),
    })),
}))
