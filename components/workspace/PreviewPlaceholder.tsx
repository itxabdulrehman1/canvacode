'use client'

import { Monitor } from 'lucide-react'

interface PreviewPlaceholderProps {
  className?: string
}

export function PreviewPlaceholder({ className }: PreviewPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 bg-[#0e0e0e]">
      <div className="h-10 w-10 rounded-xl bg-[#201f1f] border border-[#353434] flex items-center justify-center">
        <Monitor className="h-5 w-5 text-[#444748]" />
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-[#c4c7c8]">Preview</p>
        <p className="text-[10px] text-[#444748] mt-0.5">
          Preview pane will render here
        </p>
      </div>
    </div>
  )
}
