'use client'

interface DividerProps {
  label?: string
}

export function Divider({ label }: DividerProps) {
  return (
    <div className="relative flex items-center py-1 select-none">
      <div className="flex-grow border-t border-[#353434]" />
      {label && (
        <span className="flex-shrink mx-3 text-[10px] uppercase font-semibold tracking-wider text-[#444748]">
          {label}
        </span>
      )}
      <div className="flex-grow border-t border-[#353434]" />
    </div>
  )
}
