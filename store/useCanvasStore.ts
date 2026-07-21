/**
 * Legacy re-export for backwards compatibility.
 * The canonical canvas store is now at @/stores/canvasStore.
 */
import { create } from 'zustand'

export interface CanvasElement {
  id: string
  type: string
  x: number
  y: number
  props: Record<string, unknown>
}

interface CanvasStore {
  elements: CanvasElement[]
  selectedElementId: string | null
  addElement: (element: CanvasElement) => void
  updateElement: (id: string, updates: Partial<CanvasElement>) => void
  selectElement: (id: string | null) => void
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  elements: [],
  selectedElementId: null,

  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      ),
    })),

  selectElement: (id) => set({ selectedElementId: id }),
}))
