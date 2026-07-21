import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  userId: string | null
  userEmail: string | null
  userName: string | null
  userAvatarUrl: string | null
  isLoading: boolean
  error: string | null

  setUser: (user: {
    id: string
    email: string
    name: string
    avatarUrl?: string
  }) => void
  clearUser: () => void
  setError: (error: string | null) => void
  setLoading: (isLoading: boolean) => void

  loginAction: (email: string, passwordString: string, rememberMe: boolean) => Promise<{ success: boolean; error?: string }>
  registerAction: (name: string, email: string, passwordString: string) => Promise<{ success: boolean; error?: string }>
  logoutAction: () => Promise<{ success: boolean; error?: string }>
  checkSessionAction: () => Promise<boolean>
  resetPasswordAction: (email: string) => Promise<{ success: boolean; token?: string; error?: string }>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  userId: null,
  userEmail: null,
  userName: null,
  userAvatarUrl: null,
  isLoading: false,
  error: null,

  setUser: ({ id, email, name, avatarUrl }) =>
    set({
      isAuthenticated: true,
      userId: id,
      userEmail: email,
      userName: name,
      userAvatarUrl: avatarUrl ?? null,
    }),

  clearUser: () =>
    set({
      isAuthenticated: false,
      userId: null,
      userEmail: null,
      userName: null,
      userAvatarUrl: null,
    }),

  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),

  loginAction: async (email, passwordString, rememberMe) => {
    set({ isLoading: true, error: null })
    try {
      if (typeof window !== 'undefined' && window.canvasCodeAPI?.auth) {
        const response = await window.canvasCodeAPI.auth.login(email, passwordString, rememberMe)
        if (response.success && response.data) {
          const { user } = response.data
          get().setUser({ id: user.id, email: user.email, name: user.name })
          set({ isLoading: false })
          return { success: true }
        } else {
          const errorMsg = response.error || 'Login failed.'
          set({ isLoading: false, error: errorMsg })
          return { success: false, error: errorMsg }
        }
      } else {
        const errorMsg = 'Desktop bridge not available.'
        set({ isLoading: false, error: errorMsg })
        return { success: false, error: errorMsg }
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred.'
      set({ isLoading: false, error: errorMsg })
      return { success: false, error: errorMsg }
    }
  },

  registerAction: async (name, email, passwordString) => {
    set({ isLoading: true, error: null })
    try {
      if (typeof window !== 'undefined' && window.canvasCodeAPI?.auth) {
        const response = await window.canvasCodeAPI.auth.register(name, email, passwordString)
        if (response.success) {
          set({ isLoading: false })
          return { success: true }
        } else {
          const errorMsg = response.error || 'Registration failed.'
          set({ isLoading: false, error: errorMsg })
          return { success: false, error: errorMsg }
        }
      } else {
        const errorMsg = 'Desktop bridge not available.'
        set({ isLoading: false, error: errorMsg })
        return { success: false, error: errorMsg }
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred.'
      set({ isLoading: false, error: errorMsg })
      return { success: false, error: errorMsg }
    }
  },

  logoutAction: async () => {
    set({ isLoading: true, error: null })
    try {
      if (typeof window !== 'undefined' && window.canvasCodeAPI?.auth) {
        const response = await window.canvasCodeAPI.auth.logout()
        if (response.success) {
          get().clearUser()
          set({ isLoading: false })
          return { success: true }
        } else {
          const errorMsg = response.error || 'Logout failed.'
          set({ isLoading: false, error: errorMsg })
          return { success: false, error: errorMsg }
        }
      } else {
        get().clearUser()
        set({ isLoading: false })
        return { success: true }
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred.'
      set({ isLoading: false, error: errorMsg })
      return { success: false, error: errorMsg }
    }
  },

  checkSessionAction: async () => {
    set({ isLoading: true, error: null })
    try {
      if (typeof window !== 'undefined' && window.canvasCodeAPI?.auth) {
        const response = await window.canvasCodeAPI.auth.checkSession()
        if (response.success && response.data) {
          const user = response.data
          get().setUser({ id: user.id, email: user.email, name: user.name })
          set({ isLoading: false })
          return true
        }
      }
      get().clearUser()
      set({ isLoading: false })
      return false
    } catch (err) {
      console.error('Session restore failed:', err)
      get().clearUser()
      set({ isLoading: false })
      return false
    }
  },

  resetPasswordAction: async (email) => {
    set({ isLoading: true, error: null })
    try {
      if (typeof window !== 'undefined' && window.canvasCodeAPI?.auth) {
        const response = await window.canvasCodeAPI.auth.resetPassword(email)
        if (response.success && response.data) {
          set({ isLoading: false })
          return { success: true, token: response.data.token }
        } else {
          const errorMsg = response.error || 'Password reset request failed.'
          set({ isLoading: false, error: errorMsg })
          return { success: false, error: errorMsg }
        }
      } else {
        const errorMsg = 'Desktop bridge not available.'
        set({ isLoading: false, error: errorMsg })
        return { success: false, error: errorMsg }
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred.'
      set({ isLoading: false, error: errorMsg })
      return { success: false, error: errorMsg }
    }
  },
}))
