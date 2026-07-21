import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-semibold text-[#e5e2e1] tracking-tight">{title}</h2>
        {description && (
          <p className="text-xs text-[#8e9192]">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
