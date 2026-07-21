import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

const sizeMap = {
  sm: 'h-3.5 w-3.5',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
}

export function Spinner({ size = 'md', className, label }: SpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <Loader2
        className={cn('animate-spin text-blue-500', sizeMap[size])}
        aria-hidden="true"
      />
      {label && (
        <span className="text-xs text-[#8e9192] animate-pulse">{label}</span>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  )
}
