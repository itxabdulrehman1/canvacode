'use client'

import { type DragEvent } from 'react'
import { useCanvasStore } from '@/store/useCanvasStore'

export default function UIDesignBoard() {
  const { elements, selectedElementId, addElement, selectElement } = useCanvasStore()

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const componentType = event.dataTransfer.getData('componentType')
    if (!componentType) return

    const artboardRect = event.currentTarget.getBoundingClientRect()

    addElement({
      id: crypto.randomUUID(),
      type: componentType,
      x: event.clientX - artboardRect.left,
      y: event.clientY - artboardRect.top,
      props: {
        label: componentType,
      },
    })
  }

  return (
    <div className="flex-1 bg-surface-dim relative overflow-auto flex items-center justify-center p-xl h-full">
      {/* Indent guide — center vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-outline-variant/30 z-0 pointer-events-none" />

      {/* Desktop Canvas Frame / Artboard */}
      <div
        className="w-[1000px] min-h-[600px] bg-surface-container border border-outline-variant rounded-lg shadow-2xl relative z-10 flex flex-col overflow-hidden"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        onClick={() => selectElement(null)}
      >
        {/* Canvas chrome header */}
        <div className="bg-surface-container-low border-b border-outline-variant px-md py-sm flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-outline-variant" />
            <div className="w-3 h-3 rounded-full bg-outline-variant" />
            <div className="w-3 h-3 rounded-full bg-outline-variant" />
          </div>
          <div className="text-on-surface-variant font-label-mono text-label-mono bg-surface px-sm py-[2px] rounded border border-outline-variant">
            1200px / Desktop
          </div>
        </div>

        {/* Drop-zone content */}
        <div className="flex-1 p-xl flex flex-col gap-xl">
          {/* Hero Section Drop Zone */}
          <div className="border border-dashed border-outline-variant/50 p-xl rounded-lg hover:border-secondary transition-colors relative group">
            <div className="absolute -top-3 left-4 bg-surface-container px-2 text-[10px] font-label-mono text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              Hero Section
            </div>
            <h1 className="font-display text-4xl font-bold text-primary mb-md">
              Build Faster with CanvasCode
            </h1>
            <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl mb-lg">
              A professional design system and IDE for generating elite interfaces.
            </p>
            <div className="flex gap-md">
              <button className="bg-primary text-surface-container-lowest px-lg py-sm rounded font-semibold hover:opacity-90 transition-opacity active:scale-95">
                Get Started
              </button>
              <button className="bg-surface text-primary border border-outline-variant px-lg py-sm rounded hover:bg-surface-variant transition-colors">
                Documentation
              </button>
            </div>
          </div>

          {/* Login Form Drop Zone */}
          <div className="border border-dashed border-outline-variant/50 p-xl rounded-lg hover:border-secondary transition-colors relative group max-w-md mx-auto w-full bg-surface">
            <div className="absolute -top-3 left-4 bg-surface-container px-2 text-[10px] font-label-mono text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              Login Form
            </div>
            <h2 className="font-headline text-headline text-primary mb-lg">Sign In</h2>

            <div className="flex flex-col gap-md mb-lg">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-on-surface-variant">Email</label>
                <input
                  type="text"
                  defaultValue="dev@canvascode.io"
                  className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-primary font-code focus:border-secondary focus:outline-none w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-on-surface-variant">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-primary font-code focus:border-secondary focus:outline-none w-full"
                />
              </div>
            </div>

            <button className="w-full bg-primary text-surface-container-lowest py-sm rounded font-semibold hover:opacity-90 transition-opacity active:scale-95">
              Sign In
            </button>
          </div>
        </div>

        {/* Store-backed dropped components */}
        {elements.map((element) => (
          <div
            key={element.id}
            className={`absolute z-20 cursor-pointer rounded border border-outline-variant bg-surface px-sm py-1 text-on-surface font-label-mono text-[10px] ${element.id === selectedElementId ? 'ring-2 ring-blue-500' : ''
              }`}
            style={{ left: element.x, top: element.y }}
            onClick={(event) => {
              event.stopPropagation()
              selectElement(element.id)
            }}
          >
            {String(element.props['label'] ?? element.type)}
          </div>
        ))}
      </div>
    </div>
  )
}