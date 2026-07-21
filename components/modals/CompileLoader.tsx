'use client'

import { useEffect, useState } from 'react'

interface CompileLoaderProps {
  onClose: () => void
}

const terminalLines = [
  { text: 'Generating Prisma Schema...', status: '[DONE]' },
  { text: 'Resolving AST diff...', status: '[DONE]' },
  { text: 'Writing API routes...', status: '[DONE]' },
  { text: 'Optimizing bundle...', status: null, blink: true },
]

export default function CompileLoader({ onClose }: CompileLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [modulesCompiled, setModulesCompiled] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress = Math.min(currentProgress + 1, 100)

        setModulesCompiled(Math.round((nextProgress / 100) * 618))

        if (nextProgress === 100) {
          window.clearInterval(intervalId)
        }

        return nextProgress
      })
    }, 60)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (progress < 100) return

    const timeoutId = window.setTimeout(onClose, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [progress, onClose])

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-3xl flex flex-col items-center justify-center">
      {/* Mock blurred workspace behind */}
      <div aria-hidden="true" className="absolute inset-0 z-0 flex pointer-events-none">
        <div className="w-64 border-r border-outline-variant bg-surface-container-lowest h-full opacity-30" />
        <div className="flex-1 bg-surface-dim h-full p-editor-padding opacity-30">
          <div className="font-code text-code text-on-surface-variant/30 space-y-2">
            <p>import {'{'} CanvasCore {'}'} from &apos;@canvascode/core&apos;;</p>
            <p>import {'{'} ServerConfig {'}'} from &apos;./config&apos;;</p>
            <p>export const initialize = async () =&gt; {'{'}</p>
            <p className="ml-4">const app = new CanvasCore();</p>
            <p className="ml-4">await app.bootstrap(ServerConfig);</p>
            <p>{'}'}</p>
          </div>
        </div>
      </div>

      {/* ── Overlay content ── */}
      <div className="relative z-10 w-full max-w-2xl px-lg flex flex-col items-center">
        <div className="mb-xl text-center w-full">
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-outline mb-md text-3xl block"
          >
            terminal
          </span>
          <h1 className="font-display text-display text-primary tracking-tighter">
            Synthesizing Architecture...
          </h1>
        </div>

        {/* Progress bar */}
        <div className="w-full mb-xl">
          <div className="w-full h-[2px] bg-surface-container-high relative rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary progress-glow rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-sm text-on-surface-variant font-label-mono text-label-mono">
            <span>Compiling modules ({modulesCompiled}/618)</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Terminal block */}
        <div className="w-full max-w-lg bg-surface-container/40 backdrop-blur-md border border-outline-variant/50 rounded p-md font-code text-code text-on-surface-variant shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          <div className="space-y-1">
            {terminalLines.map((line, index) => (
              <div key={index} className="terminal-line flex items-start">
                <span className="text-outline mr-2">&gt;</span>
                <span>
                  {line.text}
                  {line.status && (
                    <span className="text-secondary ml-2">{line.status}</span>
                  )}
                  {line.blink && <span className="terminal-blink" />}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-lg text-on-surface-variant hover:text-primary font-label-mono text-label-mono transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="absolute bottom-0 w-full border-t border-outline-variant/30 px-md h-8 flex items-center justify-between text-on-surface-variant font-label-mono text-label-mono bg-black/20 backdrop-blur-sm">
        <span>CanvasCode Engine v2.4.0</span>
        <div className="flex space-x-md">
          <span>Runtime: V8</span>
          <span>Memory: 1024MB</span>
        </div>
      </div>
    </div>
  )
}