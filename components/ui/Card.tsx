import * as React from 'react'
import { cn } from '@/lib/utils'

// ─── Card Root ────────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'filled' | 'ghost'
  noPadding?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', noPadding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-colors duration-150',
          !noPadding && 'p-4',
          {
            default: 'bg-[#201f1f] border border-[#353434]',
            outlined: 'bg-transparent border border-[#444748]',
            filled: 'bg-[#2a2a2a]',
            ghost: 'bg-transparent',
          }[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// ─── Card Header ─────────────────────────────────────────────────────────────

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1 pb-3 border-b border-[#353434]', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

// ─── Card Title ───────────────────────────────────────────────────────────────

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-sm font-semibold text-[#e5e2e1] leading-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

// ─── Card Description ─────────────────────────────────────────────────────────

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-xs text-[#8e9192]', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

// ─── Card Content ─────────────────────────────────────────────────────────────

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-3', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

// ─── Card Footer ──────────────────────────────────────────────────────────────

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between pt-3 border-t border-[#353434]', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
