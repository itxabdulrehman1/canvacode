'use client'

import { useState } from 'react'
import { useCanvasStore } from '@/store/useCanvasStore'

type InspectorTab = 'layout' | 'style' | 'interactions' | 'code'

const inspectorTabs: { id: InspectorTab; icon: string; title: string }[] = [
  { id: 'layout', icon: 'grid_view', title: 'Layout' },
  { id: 'style', icon: 'palette', title: 'Style' },
  { id: 'interactions', icon: 'gesture', title: 'Interactions' },
  { id: 'code', icon: 'code', title: 'Code' },
]

export default function RightInspector() {
  const [activeTab, setActiveTab] = useState<InspectorTab>('layout')
  const { selectedElementId, elements, updateElement } = useCanvasStore()

  const selectedElement = elements.find(
    (element) => element.id === selectedElementId,
  )

  const updatePosition = (axis: 'x' | 'y', value: string) => {
    if (!selectedElement) return

    const position = Number(value)
    if (!Number.isFinite(position)) return

    updateElement(selectedElement.id, { [axis]: position })
  }

  return (
    <aside className="bg-surface-container-low text-secondary font-label-mono text-label-mono h-full w-[300px] border-l border-outline-variant flex flex-col py-md overflow-hidden shrink-0">
      <div className="px-md pb-md border-b border-outline-variant">
        <h2 className="font-display text-[14px] text-primary leading-tight">
          Inspector
        </h2>
        <span className="text-on-surface-variant text-[10px]">
          {selectedElement
            ? `Selected: ${selectedElement.type} · ${selectedElement.id}`
            : 'Selected: none'}
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-md py-sm">
          {!selectedElement ? (
            <div className="py-md text-[11px] text-on-surface-variant">
              Select an element to edit properties.
            </div>
          ) : (
            <>
              {activeTab === 'layout' && (
                <div className="mb-lg">
                  <div className="flex justify-between items-center mb-sm cursor-pointer hover:text-primary">
                    <h3 className="text-on-surface font-label-caps text-label-caps">
                      LAYOUT
                    </h3>
                    <span className="material-symbols-outlined text-[16px]">
                      expand_more
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-sm mb-sm">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-on-surface-variant">
                        X Position
                      </label>
                      <input
                        type="number"
                        value={selectedElement.x}
                        onChange={(event) => updatePosition('x', event.target.value)}
                        className="bg-zinc-900 border border-outline-variant rounded p-1 text-[11px] text-primary focus:border-secondary focus:outline-none w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-on-surface-variant">
                        Y Position
                      </label>
                      <input
                        type="number"
                        value={selectedElement.y}
                        onChange={(event) => updatePosition('y', event.target.value)}
                        className="bg-zinc-900 border border-outline-variant rounded p-1 text-[11px] text-primary focus:border-secondary focus:outline-none w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-on-surface-variant">
                        Display
                      </label>
                      <select className="bg-zinc-900 border border-outline-variant rounded p-1 text-[11px] text-primary focus:border-secondary focus:outline-none w-full appearance-none">
                        <option>Flex</option>
                        <option>Block</option>
                        <option>Grid</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-on-surface-variant">
                        Direction
                      </label>
                      <div className="flex bg-zinc-900 border border-outline-variant rounded overflow-hidden">
                        <button className="flex-1 p-1 bg-surface-variant text-primary flex justify-center">
                          <span className="material-symbols-outlined text-[14px]">
                            arrow_downward
                          </span>
                        </button>
                        <button className="flex-1 p-1 hover:bg-surface-container-high text-on-surface-variant flex justify-center">
                          <span className="material-symbols-outlined text-[14px]">
                            arrow_forward
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant">
                      Align
                    </label>
                    <div className="flex bg-zinc-900 border border-outline-variant rounded overflow-hidden p-1 gap-1">
                      <button className="flex-1 p-1 hover:bg-surface-container-high rounded text-on-surface-variant flex justify-center">
                        <span className="material-symbols-outlined text-[14px]">
                          align_horizontal_left
                        </span>
                      </button>
                      <button className="flex-1 p-1 bg-surface-variant rounded text-primary flex justify-center">
                        <span className="material-symbols-outlined text-[14px]">
                          align_horizontal_center
                        </span>
                      </button>
                      <button className="flex-1 p-1 hover:bg-surface-container-high rounded text-on-surface-variant flex justify-center">
                        <span className="material-symbols-outlined text-[14px]">
                          align_horizontal_right
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'style' && (
                <>
                  <div className="mb-lg">
                    <div className="flex justify-between items-center mb-sm cursor-pointer hover:text-primary">
                      <h3 className="text-on-surface font-label-caps text-label-caps">
                        SPACING
                      </h3>
                      <span className="material-symbols-outlined text-[16px]">
                        expand_more
                      </span>
                    </div>

                    <div className="bg-zinc-900 border border-outline-variant rounded p-md flex items-center justify-center relative h-32">
                      <div className="absolute inset-2 border border-dashed border-outline-variant flex items-center justify-center text-[10px] text-on-surface-variant">
                        Margin
                      </div>
                      <div className="absolute inset-6 bg-surface border border-solid border-outline-variant flex items-center justify-center text-[10px] text-on-surface-variant">
                        Padding
                      </div>
                      <div className="absolute inset-10 bg-surface-variant border border-solid border-secondary flex items-center justify-center text-[10px] text-primary">
                        Content
                      </div>
                      <input type="text" defaultValue="24" className="absolute top-0 w-8 h-4 bg-transparent text-center text-[10px] text-primary border-none focus:ring-0 p-0" />
                      <input type="text" defaultValue="0" className="absolute bottom-0 w-8 h-4 bg-transparent text-center text-[10px] text-primary border-none focus:ring-0 p-0" />
                      <input type="text" defaultValue="auto" className="absolute left-0 w-8 h-4 bg-transparent text-center text-[10px] text-primary border-none focus:ring-0 p-0" />
                      <input type="text" defaultValue="auto" className="absolute right-0 w-8 h-4 bg-transparent text-center text-[10px] text-primary border-none focus:ring-0 p-0" />
                    </div>
                  </div>

                  <div className="mb-lg border-t border-outline-variant/30 pt-md">
                    <div className="flex justify-between items-center mb-sm cursor-pointer hover:text-primary">
                      <h3 className="text-on-surface font-label-caps text-label-caps">
                        TYPOGRAPHY
                      </h3>
                      <span className="material-symbols-outlined text-[16px]">
                        expand_more
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-sm">
                      <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-[10px] text-on-surface-variant">
                          Font Family
                        </label>
                        <select className="bg-zinc-900 border border-outline-variant rounded p-1 text-[11px] text-primary focus:border-secondary focus:outline-none w-full appearance-none">
                          <option>Geist</option>
                          <option>JetBrains Mono</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-on-surface-variant">
                          Weight
                        </label>
                        <select defaultValue="600 - SemiBold" className="bg-zinc-900 border border-outline-variant rounded p-1 text-[11px] text-primary focus:border-secondary focus:outline-none w-full appearance-none">
                          <option>400 - Regular</option>
                          <option>500 - Medium</option>
                          <option>600 - SemiBold</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-on-surface-variant">
                          Size (px)
                        </label>
                        <input
                          type="number"
                          defaultValue={14}
                          className="bg-zinc-900 border border-outline-variant rounded p-1 text-[11px] text-primary focus:border-secondary focus:outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'interactions' && (
                <div className="py-md text-[11px] text-on-surface-variant">
                  No interactions configured for this element.
                </div>
              )}

              {activeTab === 'code' && (
                <div className="py-md text-[11px] text-on-surface-variant">
                  Generated component: {selectedElement.type}
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-[48px] border-l border-outline-variant flex flex-col items-center py-sm gap-sm shrink-0 bg-surface-container-low">
          {inspectorTabs.map((tab) => (
            <div
              key={tab.id}
              title={tab.title}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 cursor-pointer select-none transition-all ${activeTab === tab.id
                  ? 'bg-surface-variant border-r-2 border-secondary text-secondary rounded-l-DEFAULT'
                  : 'text-on-surface-variant hover:bg-surface-container-high rounded-DEFAULT'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {tab.icon}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}