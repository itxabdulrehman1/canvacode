import * as React from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  errorText?: string
  isError?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, errorText, isError, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const hasError = isError ?? Boolean(errorText)

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-medium text-[#c4c7c8] select-none"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full rounded-md border bg-[#1c1b1b] px-3 py-2 text-sm text-[#e5e2e1]',
            'placeholder:text-[#444748] transition-colors duration-150 resize-y min-h-[80px]',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            hasError
              ? 'border-[#93000a]/70 focus:ring-red-500/30'
              : 'border-[#353434] hover:border-[#444748]',
            className
          )}
          {...props}
        />

        {(helperText || errorText) && (
          <p className={cn('text-xs', hasError ? 'text-[#ffb4ab]' : 'text-[#8e9192]')}>
            {errorText ?? helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
