import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset select-none',
  {
    variants: {
      variant: {
        default: 'bg-[#2a2a2a] text-[#c4c7c8] ring-[#444748]',
        primary: 'bg-blue-600/15 text-blue-400 ring-blue-500/30',
        success: 'bg-green-500/10 text-green-400 ring-green-500/25',
        warning: 'bg-amber-500/10 text-amber-400 ring-amber-500/25',
        danger: 'bg-red-500/10 text-red-400 ring-red-500/25',
        outline: 'bg-transparent text-[#c4c7c8] ring-[#444748]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full', {
            'bg-[#8e9192]': variant === 'default',
            'bg-blue-400': variant === 'primary',
            'bg-green-400': variant === 'success',
            'bg-amber-400': variant === 'warning',
            'bg-red-400': variant === 'danger',
          })}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
