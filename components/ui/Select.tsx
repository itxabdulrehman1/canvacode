import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  errorText?: string
  isError?: boolean
  options: SelectOption[]
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, helperText, errorText, isError, options, placeholder, id, ...props },
    ref
  ) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const hasError = isError ?? Boolean(errorText)

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-medium text-[#c4c7c8] select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full h-8 rounded-md border bg-[#1c1b1b] pl-3 pr-8 text-sm text-[#e5e2e1]',
              'appearance-none cursor-pointer transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              hasError
                ? 'border-[#93000a]/70'
                : 'border-[#353434] hover:border-[#444748]',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="bg-[#201f1f]"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 h-3.5 w-3.5 text-[#8e9192] pointer-events-none" />
        </div>

        {(helperText || errorText) && (
          <p className={cn('text-xs', hasError ? 'text-[#ffb4ab]' : 'text-[#8e9192]')}>
            {errorText ?? helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
export type { SelectOption, SelectProps }
