import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/providers'

export const metadata: Metadata = {
  title: {
    default: 'CanvasCode — AI-native Visual Full-Stack IDE',
    template: '%s · CanvasCode',
  },
  description:
    'Design stunning UIs on the canvas, orchestrate backend logic in the Blueprint, and ship production-ready apps — all from one AI-native workspace.',
  keywords: ['IDE', 'visual development', 'AI', 'full-stack', 'no-code', 'low-code'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#141313] text-[#e5e2e1] font-sans h-screen overflow-hidden antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
