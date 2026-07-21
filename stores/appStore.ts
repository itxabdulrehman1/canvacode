import { create } from 'zustand'
import type { AppPage, Notification } from '@/types/app.types'

interface AppState {
  currentPage: AppPage
  isInitialized: boolean
  notifications: Notification[]
  setCurrentPage: (page: AppPage) => void
  setInitialized: (value: boolean) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'dashboard',
  isInitialized: false,
  notifications: [],

  setCurrentPage: (page) => set({ currentPage: page }),
  setInitialized: (value) => set({ isInitialized: value }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          read: false,
        },
      ],
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  clearNotifications: () => set({ notifications: [] }),
}))
