'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  isLoading?: boolean
}

export function SearchBar({
  className,
  value,
  onClear,
  isLoading,
  ...props
}: SearchBarProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search
        className="absolute left-2.5 h-3.5 w-3.5 text-[#8e9192] pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        className={cn(
          'w-full h-8 rounded-md border border-[#353434] bg-[#1c1b1b]',
          'pl-8 pr-8 text-sm text-[#e5e2e1] placeholder:text-[#444748]',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60',
          'hover:border-[#444748]',
          '[&::-webkit-search-cancel-button]:hidden'
        )}
        value={value}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 flex items-center text-[#8e9192] hover:text-[#e5e2e1] transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
