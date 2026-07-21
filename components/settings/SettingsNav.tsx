'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Sliders, Moon, Keyboard, ShieldAlert, Cpu } from 'lucide-react'

const SETTINGS_TABS = [
  { id: 'general', label: 'General', href: '/settings', icon: Sliders },
  { id: 'appearance', label: 'Appearance', href: '/settings/appearance', icon: Moon },
  { id: 'editor', label: 'Editor', href: '/settings/editor', icon: Cpu },
  { id: 'keyboard', label: 'Keyboard', href: '/settings/keyboard', icon: Keyboard },
]

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 w-full" aria-label="Settings navigation">
      {SETTINGS_TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = pathname === tab.href

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors',
              isActive
                ? 'bg-[#201f1f] text-[#e5e2e1] border-l-2 border-blue-500'
                : 'text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#1c1b1b]'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
