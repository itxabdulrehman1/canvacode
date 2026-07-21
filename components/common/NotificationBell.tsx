'use client'

import { Bell } from 'lucide-react'
import { useAppStore } from '@/stores/appStore'
import { cn } from '@/lib/utils'

interface NotificationBellProps {
  className?: string
}

export function NotificationBell({ className }: NotificationBellProps) {
  const notifications = useAppStore((s) => s.notifications)
  const unread = notifications.filter((n) => !n.read).length

  return (
    <button
      className={cn(
        'relative flex items-center justify-center h-8 w-8 rounded-md',
        'text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#2a2a2a] transition-colors',
        className
      )}
      aria-label={`Notifications${unread > 0 ? ` (${unread} unread)` : ''}`}
    >
      <Bell className="h-4 w-4" />
      {unread > 0 && (
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#141313]" />
      )}
    </button>
  )
}
