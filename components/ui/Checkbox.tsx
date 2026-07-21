import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <label
        htmlFor={checkboxId}
        className="flex items-start gap-2.5 cursor-pointer group select-none"
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'h-4 w-4 rounded border border-[#444748] bg-[#1c1b1b] transition-all duration-150',
              'peer-checked:bg-blue-600 peer-checked:border-blue-600',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/40 peer-focus-visible:ring-offset-1',
              'peer-focus-visible:ring-offset-[#141313]',
              'group-hover:border-[#8e9192]',
              'peer-disabled:opacity-40 peer-disabled:cursor-not-allowed',
              className
            )}
          />
          <Check className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
        </div>

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <span className="text-sm text-[#e5e2e1] leading-tight">{label}</span>
            )}
            {description && (
              <span className="text-xs text-[#8e9192]">{description}</span>
            )}
          </div>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
