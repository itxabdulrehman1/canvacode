'use client'

import { cn } from '@/lib/utils'

interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function SettingsSection({ title, description, children, className }: SettingsSectionProps) {
  return (
    <section className={cn('flex flex-col gap-4 border-b border-[#1c1b1b] pb-6 last:border-none', className)}>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold text-[#e5e2e1]">{title}</h3>
        {description && (
          <p className="text-xs text-[#8e9192]">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-4 pl-0.5">{children}</div>
    </section>
  )
}
