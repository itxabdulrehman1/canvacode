'use client'

import { Logo } from '@/components/common/Logo'

interface AuthHeaderProps {
  title: string
  description?: string
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Logo size="md" />
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-[#e5e2e1] tracking-tight">{title}</h1>
        {description && (
          <p className="text-xs text-[#8e9192] leading-normal">{description}</p>
        )}
      </div>
    </div>
  )
}
