'use client'

import { AuthLayout } from '@/layouts/AuthLayout'
import { ForgotPasswordForm } from '@/components/auth'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
