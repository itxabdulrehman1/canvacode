import { create } from 'zustand'
import type { CanvasNodeType } from '@/types/canvas-engine.types'
import { componentRegistry } from '@/features/components/componentRegistry'

const storageKey = 'canvascode-component-library'
const load = (): { favorites: CanvasNodeType[]; recent: CanvasNodeType[] } => { try { return JSON.parse(localStorage.getItem(storageKey) || '{"favorites":[],"recent":[]}') } catch { return { favorites: [], recent: [] } } }
interface ComponentLibraryState { query: string; favorites: CanvasNodeType[]; recent: CanvasNodeType[]; setQuery: (query: string) => void; toggleFavorite: (id: CanvasNodeType) => void; markUsed: (id: CanvasNodeType) => void; filtered: () => typeof componentRegistry }
export const useComponentLibraryStore = create<ComponentLibraryState>((set, get) => ({
  query: '', favorites: typeof window === 'undefined' ? [] : load().favorites, recent: typeof window === 'undefined' ? [] : load().recent,
  setQuery: (query) => set({ query }),
  toggleFavorite: (id) => set((state) => { const favorites = state.favorites.includes(id) ? state.favorites.filter((value) => value !== id) : [...state.favorites, id]; if (typeof window !== 'undefined') localStorage.setItem(storageKey, JSON.stringify({ favorites, recent: state.recent })); return { favorites } }),
  markUsed: (id) => set((state) => { const recent = [id, ...state.recent.filter((value) => value !== id)].slice(0, 12); if (typeof window !== 'undefined') localStorage.setItem(storageKey, JSON.stringify({ favorites: state.favorites, recent })); return { recent } }),
  filtered: () => { const query = get().query.trim().toLowerCase(); return !query ? componentRegistry : componentRegistry.filter((item) => [item.name, item.category, ...item.keywords].some((value) => value.includes(query))) },
}))
