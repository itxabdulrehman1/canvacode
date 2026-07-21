'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface DialogContextValue {
  isOpen: boolean
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  openDialog: (options: {
    title: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void
  }) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextValue>({
  isOpen: false,
  title: '',
  message: '',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  onConfirm: () => undefined,
  openDialog: () => undefined,
  closeDialog: () => undefined,
})

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [confirmLabel, setConfirmLabel] = useState('Confirm')
  const [cancelLabel, setCancelLabel] = useState('Cancel')
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => undefined)

  const openDialog = useCallback(
    ({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm }: {
      title: string
      message: string
      confirmLabel?: string
      cancelLabel?: string
      onConfirm: () => void
    }) => {
      setTitle(title)
      setMessage(message)
      setConfirmLabel(confirmLabel)
      setCancelLabel(cancelLabel)
      setOnConfirm(() => onConfirm)
      setIsOpen(true)
    },
    []
  )

  const closeDialog = useCallback(() => setIsOpen(false), [])

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        title,
        message,
        confirmLabel,
        cancelLabel,
        onConfirm,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  return useContext(DialogContext)
}
