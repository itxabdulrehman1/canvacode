import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const iconSize = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' }[size]
  const textSize = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }[size]

  return (
    <div className={cn('flex items-center gap-2 select-none', className)}>
      <div className="relative flex items-center justify-center">
        <div className={cn('rounded-md bg-blue-600 flex items-center justify-center', {
          sm: 'h-6 w-6',
          md: 'h-7 w-7',
          lg: 'h-8 w-8',
        }[size])}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(iconSize, 'text-white')}
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <path d="M17.5 14.5 L21 18 L17.5 21.5" />
            <path d="M14 18h4" />
          </svg>
        </div>
      </div>
      {showText && (
        <span
          className={cn(
            'font-semibold tracking-tight text-[#e5e2e1]',
            textSize
          )}
        >
          Canvas<span className="text-blue-400">Code</span>
        </span>
      )}
    </div>
  )
}
