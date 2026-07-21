'use client'

import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function ThemeSettings() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title="Theme"
        description="Customize the application appearance"
      />
      <div className="flex flex-col gap-3 max-w-xs">
        <Select
          label="Color theme"
          id="theme-select"
          options={[
            { value: 'dark', label: 'Dark (Default)' },
            { value: 'light', label: 'Light' },
            { value: 'system', label: 'System preference' },
          ]}
          defaultValue="dark"
        />
        <Select
          label="Accent color"
          id="accent-select"
          options={[
            { value: 'blue', label: 'Blue (Default)' },
            { value: 'indigo', label: 'Indigo' },
            { value: 'violet', label: 'Violet' },
            { value: 'teal', label: 'Teal' },
          ]}
          defaultValue="blue"
        />
        <Checkbox
          label="Compact mode"
          description="Use tighter spacing throughout the interface"
          id="compact-mode"
        />
      </div>
    </div>
  )
}
