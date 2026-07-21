import { create } from 'zustand'
export type PreviewDevice = 'desktop' | 'tablet' | 'mobile'
const key = 'canvascode-preview-settings'
const initial = typeof window === 'undefined' ? null : (() => { try { return JSON.parse(localStorage.getItem(key) || 'null') } catch { return null } })()
export const usePreviewStore = create<{ device: PreviewDevice; zoom: number; setDevice: (device: PreviewDevice) => void; setZoom: (zoom: number) => void }>((set) => ({ device: initial?.device ?? 'desktop', zoom: initial?.zoom ?? 1, setDevice: (device) => set((state) => { const value = { ...state, device }; localStorage.setItem(key, JSON.stringify({ device: value.device, zoom: value.zoom })); return { device } }), setZoom: (zoom) => set((state) => { const value = { ...state, zoom }; localStorage.setItem(key, JSON.stringify({ device: value.device, zoom })); return { zoom } }) }))
