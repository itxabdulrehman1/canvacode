'use client'

import { TitleBar } from './TitleBar'
import { Sidebar } from './Sidebar'
import { StatusBar } from './StatusBar'
import { CommandPalette } from '@/components/common/CommandPalette'
import { CreateProjectModal } from '@/components/modals/CreateProjectModal'
import { RenameProjectModal } from '@/components/modals/RenameProjectModal'
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  showSidebar?: boolean
  showTitleBar?: boolean
  showStatusBar?: boolean
  className?: string
}

export function AppShell({
  children,
  showSidebar = true,
  showTitleBar = true,
  showStatusBar = true,
  className,
}: AppShellProps) {
  return (
    <div className={cn('flex flex-col h-screen w-full overflow-hidden bg-[#141313]', className)}>
      {showTitleBar && <TitleBar />}

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar />}

        <main className="flex-1 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>

      {showStatusBar && <StatusBar />}

      {/* Global overlays & Modals */}
      <CommandPalette />
      <CreateProjectModal />
      <RenameProjectModal />
      <DeleteConfirmationModal />
    </div>
  )
}
