'use client'

import * as React from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface PasswordFieldProps {
  label?: string
  placeholder?: string
  errorText?: string
  registration: UseFormRegisterReturn
  id?: string
}

export function PasswordField({
  label = 'Password',
  placeholder = 'Enter password',
  errorText,
  registration,
  id = 'password-field',
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Input
      label={label}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      leftIcon={<Lock className="h-3.5 w-3.5" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-[#8e9192] hover:text-[#e5e2e1] transition-colors focus:outline-none"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="h-3.5 w-3.5" />
          ) : (
            <Eye className="h-3.5 w-3.5" />
          )}
        </button>
      }
      errorText={errorText}
      id={id}
      {...registration}
    />
  )
}
