'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ThemeMode } from '@/types/app.types'

interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  resolvedTheme: 'dark' | 'light'
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => undefined,
  resolvedTheme: 'dark',
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark')

  const resolvedTheme = theme === 'system'
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('canvascode-theme', newTheme)
    }
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    const stored = localStorage.getItem('canvascode-theme') as ThemeMode | null
    if (stored) setThemeState(stored)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  return useContext(ThemeContext)
}
