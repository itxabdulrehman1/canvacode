'use client'

import * as React from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface SocialButtonProps {
  provider: 'github' | 'google'
  onClick?: () => void
  disabled?: boolean
}

export function SocialButton({ provider, onClick, disabled }: SocialButtonProps) {
  const label = provider === 'github' ? 'GitHub' : 'Google'

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className="w-full text-xs h-8 flex justify-center items-center gap-2"
      onClick={onClick}
      disabled={disabled}
      leftIcon={
        provider === 'github' ? (
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-6.887 4.113-4.706 0-8.52-3.814-8.52-8.52 0-4.706 3.814-8.52 8.52-8.52 2.16 0 4.104.815 5.592 2.304l3.12-3.12C18.144.972 15.348 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.76 0 11.24-4.74 11.24-11.24 0-.825-.09-1.575-.24-2.28H12.24z" />
          </svg>
        )
      }
    >
      Sign in with {label}
    </Button>
  )
}
