import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'line' | 'box' | 'circle'
  width?: string
  height?: string
}

export function Skeleton({
  className,
  variant = 'line',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[#2a2a2a]',
        {
          line: 'h-4 w-full rounded',
          box: 'rounded-md',
          circle: 'rounded-full',
        }[variant],
        className
      )}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  )
}

interface SkeletonGroupProps {
  lines?: number
  className?: string
}

export function SkeletonGroup({ lines = 3, className }: SkeletonGroupProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="line"
          className={i === lines - 1 ? 'w-2/3' : 'w-full'}
        />
      ))}
    </div>
  )
}
