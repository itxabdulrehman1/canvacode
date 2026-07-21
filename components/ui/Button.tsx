import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md',
    'font-medium transition-all duration-150 focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1',
    'focus-visible:ring-offset-[#141313] disabled:pointer-events-none disabled:opacity-40',
    'select-none active:scale-[0.97]',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white hover:bg-blue-500 shadow-sm shadow-blue-900/30',
        secondary:
          'bg-[#2a2a2a] text-[#e5e2e1] border border-[#444748] hover:bg-[#353434] hover:border-[#8e9192]',
        ghost:
          'text-[#c4c7c8] hover:text-[#e5e2e1] hover:bg-[#201f1f]',
        danger:
          'bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/50 hover:bg-[#93000a]/30 hover:border-[#ffb4ab]/30',
        outline:
          'border border-[#444748] text-[#e5e2e1] hover:bg-[#201f1f] hover:border-[#8e9192]',
      },
      size: {
        sm: 'h-7 px-2.5 text-xs rounded',
        md: 'h-8 px-3 text-sm',
        lg: 'h-9 px-4 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled ?? isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
