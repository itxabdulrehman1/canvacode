'use client'

import { APP_VERSION } from '@/lib/constants'

export function AuthFooter() {
  return (
    <footer className="text-center select-none text-[10px] text-[#444748] mt-2">
      <p>© {new Date().getFullYear()} CanvasCode Studio. All rights reserved.</p>
      <p className="mt-0.5 font-mono">v{APP_VERSION}</p>
    </footer>
  )
}
