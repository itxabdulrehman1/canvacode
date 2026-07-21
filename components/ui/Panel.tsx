import * as React from 'react'
import { cn } from '@/lib/utils'

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'raised' | 'floating'
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, elevation = 'flat', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-[#353434] bg-[#1c1b1b]',
          {
            flat: '',
            raised: 'shadow-md shadow-black/30',
            floating:
              'shadow-xl shadow-black/50 backdrop-blur-sm bg-[#1c1b1b]/95',
          }[elevation],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Panel.displayName = 'Panel'

export { Panel }
