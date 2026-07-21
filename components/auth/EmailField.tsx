'use client'

import { Mail } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface EmailFieldProps {
  label?: string
  placeholder?: string
  errorText?: string
  registration: UseFormRegisterReturn
  id?: string
}

export function EmailField({
  label = 'Email Address',
  placeholder = 'you@company.com',
  errorText,
  registration,
  id = 'email-field',
}: EmailFieldProps) {
  return (
    <Input
      label={label}
      type="email"
      placeholder={placeholder}
      leftIcon={<Mail className="h-3.5 w-3.5" />}
      errorText={errorText}
      id={id}
      autoComplete="email"
      {...registration}
    />
  )
}
