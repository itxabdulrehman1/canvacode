'use client'

import { ThemeProvider } from './ThemeProvider'
import { QueryProvider } from './QueryProvider'
import { ToastProvider } from './ToastProvider'
import { DialogProvider } from './DialogProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <DialogProvider>
          <ToastProvider>{children}</ToastProvider>
        </DialogProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
