'use client'

import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { SettingsSection } from './SettingsSection'

export function EditorSettings() {
  return (
    <div className="flex flex-col gap-6">
      <SettingsSection
        title="Monaco Editor Config"
        description="Configure typography and layout preferences for code panels"
      >
        <div className="max-w-xs flex flex-col gap-4">
          <Select
            label="Editor Font Size"
            id="editor-font-size"
            options={[
              { value: '12', label: '12px' },
              { value: '14', label: '14px (Default)' },
              { value: '16', label: '16px' },
              { value: '18', label: '18px' },
            ]}
            defaultValue="14"
          />
          <Select
            label="Tab Size"
            id="editor-tab-size"
            options={[
              { value: '2', label: '2 spaces (Default)' },
              { value: '4', label: '4 spaces' },
            ]}
            defaultValue="2"
          />
        </div>

        <Checkbox
          label="Enable Minimap"
          description="Display small structural code visualizer on side"
          id="editor-minimap"
        />
        <Checkbox
          label="Line numbers"
          description="Show gutter numbering for files"
          id="editor-line-numbers"
          defaultChecked
        />
        <Checkbox
          label="Format on save"
          description="Automatically trigger code formatting when compiling"
          id="editor-format-on-save"
          defaultChecked
        />
      </SettingsSection>
    </div>
  )
}
