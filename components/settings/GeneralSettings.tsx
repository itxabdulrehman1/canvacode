'use client'

import { Checkbox } from '@/components/ui/Checkbox'
import { Select } from '@/components/ui/Select'
import { SettingsSection } from './SettingsSection'

export function GeneralSettings() {
  return (
    <div className="flex flex-col gap-6">
      <SettingsSection
        title="Application"
        description="General preferences for running the CanvasCode IDE workspace"
      >
        <Checkbox
          label="Auto-save changes"
          description="Automatically commit edits to visual models in background"
          id="autosave-checkbox"
          defaultChecked
        />
        <Checkbox
          label="Confirm deletions"
          description="Prompt for validation before removing canvas elements or backend nodes"
          id="confirm-delete-checkbox"
          defaultChecked
        />
        <Checkbox
          label="Telemetry"
          description="Help improve CanvasCode by sending anonymous usage metadata"
          id="telemetry-checkbox"
        />
      </SettingsSection>

      <SettingsSection
        title="Default Project Config"
        description="Global defaults for newly initialized workspace stacks"
      >
        <div className="max-w-xs flex flex-col gap-4">
          <Select
            label="Template framework"
            id="default-framework-select"
            options={[
              { value: 'next', label: 'Next.js (App Router)' },
              { value: 'react', label: 'Vite React TypeScript' },
              { value: 'astro', label: 'Astro Studio Stack' },
            ]}
            defaultValue="next"
          />
        </div>
      </SettingsSection>
    </div>
  )
}
