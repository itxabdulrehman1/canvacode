'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/AppShell'
import { WorkspaceToolbar } from '@/components/workspace/WorkspaceToolbar'
import { WorkspaceSidebar } from '@/components/workspace/WorkspaceSidebar'
import { LoadingScreen } from '@/components/auth/LoadingScreen'

interface WorkspaceLayoutProps {
  children: React.ReactNode
}

export function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
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
    <AppShell showSidebar={false} showTitleBar showStatusBar>
      <div className="flex flex-1 overflow-hidden">
        <WorkspaceSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <WorkspaceToolbar />
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </div>
    </AppShell>
  )
}
