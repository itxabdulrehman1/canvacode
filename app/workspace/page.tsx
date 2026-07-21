'use client'

import { WorkspaceLayout } from '@/layouts/WorkspaceLayout'
import { WorkspaceShell } from '@/components/workspace/WorkspaceShell'

export default function WorkspacePage() {
  return (
    <WorkspaceLayout>
      <WorkspaceShell />
    </WorkspaceLayout>
  )
}
