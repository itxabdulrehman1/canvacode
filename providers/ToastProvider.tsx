'use client'

import { Toaster } from 'sonner'

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#201f1f',
            border: '1px solid #444748',
            color: '#e5e2e1',
            borderRadius: '6px',
            fontSize: '13px',
          },
        }}
        closeButton
      />
    </>
  )
}
