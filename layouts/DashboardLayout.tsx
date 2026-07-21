'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { LoadingScreen } from '@/components/auth/LoadingScreen'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [isValidating, setIsValidating] = React.useState(true)

  React.useEffect(() => {
    const validate = async () => {
      try {
        if (typeof window !== 'undefined' && window.canvasCodeAPI?.auth) {
          const response = await window.canvasCodeAPI.auth.checkSession()
          if (!response.success || !response.data) {
            router.push('/login')
          } else {
            setIsValidating(false)
          }
        } else {
          // In non-electron environment (browser test) allow bypass or fallback
          setIsValidating(false)
        }
      } catch (err) {
        console.error('Session guard verification error:', err)
        router.push('/login')
      }
    }
    validate()
  }, [router])

  if (isValidating) {
    return <LoadingScreen message="Verifying session credentials…" />
  }

  return (
    <AppShell showSidebar showTitleBar showStatusBar>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </AppShell>
  )
}
