'use client'

import { Select } from '@/components/ui/Select'
import { SettingsSection } from './SettingsSection'
import { Card } from '@/components/ui/Card'
import { KeyboardShortcut } from '@/components/common/KeyboardShortcut'

export function KeyboardSettings() {
  return (
    <div className="flex flex-col gap-6">
      <SettingsSection
        title="Keymap Schema"
        description="Select keyboard layout shortcuts bindings scheme"
      >
        <div className="max-w-xs flex flex-col gap-4">
          <Select
            label="Keymap profile"
            id="keymap-profile-select"
            options={[
              { value: 'default', label: 'VS Code Default' },
              { value: 'vim', label: 'Vim Bindings' },
              { value: 'emacs', label: 'Emacs Profile' },
            ]}
            defaultValue="default"
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Global Shortcuts"
        description="Core shortcuts mapped inside CanvasCode workspace"
      >
        <Card noPadding>
          <div className="divide-y divide-[#1c1b1b]">
            {[
              { desc: 'Open Command Palette', keys: ['⌘', 'K'] },
              { desc: 'Toggle Sidebar Panel', keys: ['⌘', 'B'] },
              { desc: 'New Workspace Project', keys: ['⌘', 'N'] },
              { desc: 'Save Visual Graph State', keys: ['⌘', 'S'] },
              { desc: 'Toggle Canvas Grid overlay', keys: ['G'] },
            ].map((sh, idx) => (
              <div key={idx} className="flex items-center justify-between p-3">
                <span className="text-xs text-[#c4c7c8]">{sh.desc}</span>
                <KeyboardShortcut keys={sh.keys} />
              </div>
            ))}
          </div>
        </Card>
      </SettingsSection>
    </div>
  )
}
