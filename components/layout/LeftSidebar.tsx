'use client'

import { useState, type DragEvent } from 'react'

type SidebarTab = 'components' | 'layers' | 'assets' | 'history'

const tabs: { id: SidebarTab; icon: string; title: string }[] = [
  { id: 'components', icon: 'widgets', title: 'Components' },
  { id: 'layers', icon: 'layers', title: 'Layers' },
  { id: 'assets', icon: 'folder_open', title: 'Assets' },
  { id: 'history', icon: 'history', title: 'History' },
]

const componentGroups = [
  {
    label: 'LAYOUT',
    items: [
      { icon: 'view_stream', label: 'Hero Section', type: 'hero' },
      { icon: 'grid_view', label: 'Grid', type: 'grid' },
    ],
  },
  {
    label: 'FORMS',
    items: [
      { icon: 'smart_button', label: 'Button', type: 'button' },
      { icon: 'input', label: 'Input Field', type: 'input' },
    ],
  },
  {
    label: 'DATA',
    items: [{ icon: 'table_chart', label: 'Data Table', type: 'data-table' }],
  },
]

export default function LeftSidebar() {
  const [activeTab, setActiveTab] = useState<SidebarTab>('components')

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    type: string,
  ) => {
    event.dataTransfer.setData('componentType', type)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="bg-surface-container-low text-secondary font-label-mono text-label-mono h-full w-[280px] border-r border-outline-variant flex flex-col py-md overflow-hidden shrink-0">
      {/* Header */}
      <div className="px-md pb-md border-b border-outline-variant flex items-center gap-sm">
        <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant">
          <span className="material-symbols-outlined text-[14px]">account_tree</span>
        </div>
        <div>
          <h2 className="font-display text-[14px] text-primary leading-tight">
            Project Workspace
          </h2>
          <span className="text-on-surface-variant text-[10px]">main-branch</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Icon tabs */}
        <div className="w-[48px] border-r border-outline-variant flex flex-col items-center py-sm gap-sm shrink-0 overflow-hidden">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              title={tab.title}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 rounded-DEFAULT cursor-pointer select-none transition-all ${activeTab === tab.id
                  ? 'bg-surface-variant border-l-2 border-secondary text-secondary rounded-r-DEFAULT'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
            </div>
          ))}
          <div
            title="Deploy"
            className="p-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-DEFAULT cursor-pointer select-none mt-auto"
          >
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-md py-sm">
          {activeTab === 'components' && (
            <>
              {componentGroups.map((group) => (
                <div key={group.label} className="mb-lg">
                  <h3 className="text-on-surface font-label-caps text-label-caps mb-sm">
                    {group.label}
                  </h3>
                  <div className="grid grid-cols-2 gap-sm">
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        draggable={true}
                        onDragStart={(event) => handleDragStart(event, item.type)}
                        className="border border-outline-variant bg-surface rounded-DEFAULT p-sm flex flex-col items-center gap-1 cursor-grab hover:border-dashed hover:border-secondary transition-all active:opacity-70"
                      >
                        <span className="material-symbols-outlined text-on-surface-variant">
                          {item.icon}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'layers' && (
            <div className="text-on-surface-variant text-[11px] py-sm">
              <p className="mb-sm font-label-caps text-label-caps text-on-surface">LAYERS</p>
              <div className="flex flex-col gap-1">
                {['div.hero-section', 'h1.title', 'p.subtitle', 'div.cta-group', 'div.login-form'].map((layer) => (
                  <div key={layer} className="flex items-center gap-sm px-sm py-1 hover:bg-surface-container-high rounded cursor-pointer">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">crop_square</span>
                    <span className="font-code text-[11px] text-on-surface-variant">{layer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="text-on-surface-variant text-[11px] py-sm">
              <p className="font-label-caps text-label-caps text-on-surface mb-sm">ASSETS</p>
              <p className="text-[11px] text-on-surface-variant">No assets uploaded yet.</p>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="text-on-surface-variant text-[11px] py-sm">
              <p className="font-label-caps text-label-caps text-on-surface mb-sm">HISTORY</p>
              {['Add Hero Section', 'Modify login form', 'Update font size', 'Add grid layout'].map(
                (entry, i) => (
                  <div key={i} className="flex items-center gap-sm py-1 hover:text-primary cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">history</span>
                    <span>{entry}</span>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      <div className="px-md pt-sm border-t border-outline-variant">
        <button className="w-full bg-surface-variant hover:bg-surface-container-high text-primary border border-outline-variant py-1 rounded-DEFAULT transition-colors text-center">
          Add Module
        </button>
      </div>
    </aside>
  )
}