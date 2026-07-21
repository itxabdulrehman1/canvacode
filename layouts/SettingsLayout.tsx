'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { SettingsNav } from '@/components/settings/SettingsNav'
import { LoadingScreen } from '@/components/auth/LoadingScreen'

interface SettingsLayoutProps {
  children: React.ReactNode
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
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
      <div className="flex flex-1 overflow-hidden">
        {/* Settings nav */}
        <div className="w-48 shrink-0 border-r border-[#1c1b1b] bg-[#141313] p-2">
          <SettingsNav />
        </div>

        {/* Settings content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </AppShell>
  )
}
