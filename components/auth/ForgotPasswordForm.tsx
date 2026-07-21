'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Send } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

import { useAuthStore } from '@/stores/authStore'
import { ForgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/Button'
import { AuthCard } from './AuthCard'
import { AuthHeader } from './AuthHeader'
import { AuthFooter } from './AuthFooter'
import { EmailField } from './EmailField'
import { AuthAlert } from './AuthAlert'
import { LoadingScreen } from './LoadingScreen'

export function ForgotPasswordForm() {
  const router = useRouter()
  const [successMessage, setSuccessMessage] = React.useState<string | undefined>(undefined)

  const { resetPasswordAction, isLoading, error } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setSuccessMessage(undefined)

    const result = await resetPasswordAction(data.email)
    if (result.success && result.token) {
      setSuccessMessage(`Reset token generated successfully: ${result.token} (Email delivery is simulated in Developer Mode).`)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen message="Sending recovery instructions…" />}
      </AnimatePresence>

      <AuthCard>
        <AuthHeader
          title="Reset Password"
          description="Enter your email to receive password recovery instructions"
        />

        <AuthAlert type="error" message={error || undefined} />
        <AuthAlert type="success" message={successMessage} />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <EmailField
            registration={register('email')}
            errorText={errors.email?.message}
            id="forgot-email"
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full mt-2"
            rightIcon={<Send className="h-3.5 w-3.5" />}
            disabled={isLoading}
          >
            Send Instructions
          </Button>
        </form>

        <p className="text-center text-xs text-[#8e9192] mt-1">
          <button
            onClick={() => router.push('/login')}
            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 focus:outline-none"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to login
          </button>
        </p>

        <AuthFooter />
      </AuthCard>
    </>
  )
}
