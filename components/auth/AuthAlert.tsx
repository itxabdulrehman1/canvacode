'use client'

import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthAlertProps {
  type: 'error' | 'success'
  message?: string
}

export function AuthAlert({ type, message }: AuthAlertProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs leading-normal select-none ${
            type === 'error'
              ? 'bg-[#ffb4ab]/10 border-[#93000a]/30 text-[#ffb4ab]'
              : 'bg-green-500/10 border-green-500/20 text-green-400'
          }`}
        >
          {type === 'error' ? (
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
