import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-12 px-6 text-center',
        className
      )}
    >
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2a2a2a] border border-[#353434]">
          <Icon className="h-6 w-6 text-[#8e9192]" aria-hidden="true" />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-[#e5e2e1]">{title}</h3>
        {description && (
          <p className="text-xs text-[#8e9192] max-w-[280px]">{description}</p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}
