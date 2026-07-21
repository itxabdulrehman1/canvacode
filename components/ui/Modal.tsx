'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { modalBackdrop, modalContent } from '@/animations/variants'
import { transitionModal } from '@/animations/transitions'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showClose?: boolean
  className?: string
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
  className,
}: ModalProps) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transitionModal}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className={cn(
              'relative w-full rounded-xl border border-[#353434]',
              'bg-[#1c1b1b] shadow-2xl shadow-black/60',
              sizeMap[size],
              className
            )}
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transitionModal}
          >
            {(title || showClose) && (
              <div className="flex items-start justify-between p-4 border-b border-[#353434]">
                <div className="flex flex-col gap-0.5">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-sm font-semibold text-[#e5e2e1]"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-xs text-[#8e9192]">{description}</p>
                  )}
                </div>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="ml-4 shrink-0 rounded p-1 text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#2a2a2a] transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
            <div className="p-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
