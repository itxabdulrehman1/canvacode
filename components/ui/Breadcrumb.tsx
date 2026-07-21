import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  className?: string
}

export function Breadcrumb({ items, showHome = false, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1', className)}
    >
      {showHome && (
        <>
          <span className="flex items-center text-[#8e9192] hover:text-[#e5e2e1] transition-colors cursor-pointer">
            <Home className="h-3 w-3" />
          </span>
          {items.length > 0 && (
            <ChevronRight className="h-3 w-3 text-[#444748]" aria-hidden="true" />
          )}
        </>
      )}
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <span
            onClick={item.onClick}
            className={cn(
              'text-xs transition-colors',
              item.isActive || index === items.length - 1
                ? 'text-[#e5e2e1] font-medium cursor-default'
                : 'text-[#8e9192] hover:text-[#c4c7c8] cursor-pointer'
            )}
            aria-current={
              item.isActive || index === items.length - 1 ? 'page' : undefined
            }
          >
            {item.label}
          </span>
          {index < items.length - 1 && (
            <ChevronRight className="h-3 w-3 text-[#444748]" aria-hidden="true" />
          )}
        </span>
      ))}
    </nav>
  )
}
