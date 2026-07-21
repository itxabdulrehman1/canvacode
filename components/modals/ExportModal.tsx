'use client'

import { useState } from 'react'

interface ExportModalProps {
  onClose: () => void
}

const stagedFiles = [
  { type: 'added',    icon: 'add',            path: '/app/api/auth/route.ts'   },
  { type: 'modified', icon: 'change_history', path: '/prisma/schema.prisma'    },
  { type: 'added',    icon: 'add',            path: '/components/AuthForm.tsx' },
  { type: 'modified', icon: 'change_history', path: '/lib/utils.ts'            },
]

export default function ExportModal({ onClose }: ExportModalProps) {
  const [branch, setBranch] = useState('canvascode-auto-auth')
  const [commitMsg, setCommitMsg] = useState(
    'feat: implement parallel verification route and prisma schema update'
  )

  return (
    /* z-[100] sits above all workspace layers */
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-xl">

      {/* Dismiss backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* ── Modal Container ── */}
      <div className="relative bg-surface-container-lowest border border-outline-variant rounded-lg w-full max-w-4xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5">

        {/* Header */}
        <div className="px-lg py-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h2 className="font-headline text-headline text-primary tracking-tight">
            Synchronize Architecture
          </h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            title="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* ── 2-Column Content Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-[480px]">

          {/* Left Column: Staged Changes */}
          <div className="p-lg flex flex-col gap-md overflow-y-auto bg-surface-container-lowest">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
              Staged Changes
            </h3>
            <div className="flex flex-col font-code text-code text-on-surface">
              {stagedFiles.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-sm py-unit px-sm hover:bg-surface-container-high rounded transition-colors group cursor-default relative"
                >
                  {file.type === 'modified' && (
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-secondary opacity-0 group-hover:opacity-100 transition-opacity rounded-l" />
                  )}
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      file.type === 'added' ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {file.icon}
                  </span>
                  <span
                    className={`truncate flex-1 ${
                      file.type === 'added' ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {file.path}
                  </span>
                  <span className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                    {file.type === 'added' ? 'A' : 'M'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: GitHub PR Form */}
          <div className="p-lg border-l border-outline-variant flex flex-col gap-lg bg-surface-container-lowest">

            {/* GitHub user context */}
            <div className="flex items-center gap-md pb-md border-b border-surface-variant">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant text-primary overflow-hidden">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-sm text-body-sm text-primary">dev@canvascode.io</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant">
                  Connected to GitHub
                </span>
              </div>
            </div>

            {/* Form inputs */}
            <div className="flex flex-col gap-md flex-1">
              {/* Target Branch */}
              <div className="flex flex-col gap-xs">
                <label className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest pl-unit">
                  Target Branch
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-sm text-on-surface-variant text-[16px]">
                    call_split
                  </span>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant rounded py-sm pl-[32px] pr-sm font-code text-code text-primary focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all placeholder:text-surface-variant"
                    placeholder="Branch name"
                  />
                </div>
              </div>

              {/* Commit Message */}
              <div className="flex flex-col gap-xs flex-1">
                <label className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest pl-unit">
                  Commit Message
                </label>
                <textarea
                  value={commitMsg}
                  onChange={(e) => setCommitMsg(e.target.value)}
                  className="w-full flex-1 bg-surface-container border border-outline-variant rounded p-sm font-code text-code text-primary focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all resize-none placeholder:text-surface-variant min-h-[120px]"
                  placeholder="Enter commit message..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-lg py-md border-t border-outline-variant flex justify-end gap-md bg-surface-container-low">
          <button className="px-md py-sm rounded border border-outline-variant bg-transparent text-primary font-body-sm text-body-sm font-medium hover:bg-surface-variant transition-colors flex items-center gap-xs active:scale-95">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download .zip
          </button>
          <button className="px-md py-sm rounded bg-primary text-on-primary font-body-sm text-body-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-xs shadow-[0_0_12px_rgba(255,255,255,0.15)] focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary active:scale-95">
            <span className="material-symbols-outlined text-[18px]">merge_type</span>
            Open Pull Request
          </button>
        </div>
      </div>
    </div>
  )
}
