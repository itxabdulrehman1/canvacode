import * as React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  errorText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, helperText, errorText, leftIcon, rightIcon, isError, id, ...props },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const hasError = isError ?? Boolean(errorText)

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-[#c4c7c8] select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-2.5 text-[#8e9192] flex items-center">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-8 rounded-md border bg-[#1c1b1b] px-3 text-sm text-[#e5e2e1]',
              'placeholder:text-[#444748] transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              hasError
                ? 'border-[#93000a]/70 focus:ring-red-500/30 focus:border-red-500/50'
                : 'border-[#353434] hover:border-[#444748]',
              leftIcon && 'pl-8',
              rightIcon && 'pr-8',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-2.5 text-[#8e9192] flex items-center">
              {rightIcon}
            </span>
          )}
        </div>

        {(helperText || errorText) && (
          <p
            className={cn(
              'text-xs',
              hasError ? 'text-[#ffb4ab]' : 'text-[#8e9192]'
            )}
          >
            {errorText ?? helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }
