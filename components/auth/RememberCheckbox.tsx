'use client'

import { Checkbox } from '@/components/ui/Checkbox'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface RememberCheckboxProps {
  label?: string
  registration: UseFormRegisterReturn
  id?: string
}

export function RememberCheckbox({
  label = 'Remember me',
  registration,
  id = 'remember-checkbox',
}: RememberCheckboxProps) {
  return (
    <Checkbox
      label={label}
      id={id}
      {...registration}
    />
  )
}
