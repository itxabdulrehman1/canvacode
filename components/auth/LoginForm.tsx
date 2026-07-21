'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { useAuthStore } from '@/stores/authStore'
import { LoginSchema, type LoginInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/Button'
import { slideInUp } from '@/animations/variants'
import { transitionDefault } from '@/animations/transitions'

import { AuthCard } from './AuthCard'
import { AuthHeader } from './AuthHeader'
import { AuthFooter } from './AuthFooter'
import { EmailField } from './EmailField'
import { PasswordField } from './PasswordField'
import { RememberCheckbox } from './RememberCheckbox'
import { Divider } from './Divider'
import { SocialButton } from './SocialButton'
import { AuthAlert } from './AuthAlert'
import { LoadingScreen } from './LoadingScreen'
import { WelcomeScreen } from './WelcomeScreen'

export function LoginForm() {
  const router = useRouter()
  const [showWelcome, setShowWelcome] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState<string | undefined>(undefined)

  const { loginAction, checkSessionAction, isLoading, error, setError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  React.useEffect(() => {
    const checkActiveSession = async () => {
      try {
        const hasSession = await checkSessionAction()
        if (hasSession) {
          router.push('/dashboard')
        }
      } catch (err) {
        console.error('Failed to restore session:', err)
      }
    }
    checkActiveSession()
  }, [router, checkSessionAction])

  const onSubmit = async (data: LoginInput) => {
    setSuccessMessage(undefined)

    const result = await loginAction(data.email, data.password, data.rememberMe)
    if (result.success) {
      setSuccessMessage('Successfully authenticated.')
      setShowWelcome(true)
    }
  }

  const handleWelcomeComplete = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen message="Authenticating credentials…" />}
        {showWelcome && (
          <WelcomeScreen
            userName="Developer"
            onComplete={handleWelcomeComplete}
          />
        )}
      </AnimatePresence>

      <AuthCard>
        <AuthHeader
          title="Sign in to CanvasCode"
          description="Access your Visual Full-Stack Studio workspace"
        />

        <AuthAlert type="error" message={error || undefined} />
        <AuthAlert type="success" message={successMessage} />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <EmailField
            registration={register('email')}
            errorText={errors.email?.message}
            id="login-email"
          />

          <PasswordField
            registration={register('password')}
            errorText={errors.password?.message}
            id="login-password"
          />

          <div className="flex items-center justify-between mt-1">
            <RememberCheckbox
              registration={register('rememberMe')}
              id="login-remember"
            />
            <button
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full mt-2"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            disabled={isLoading}
          >
            Sign In
          </Button>
        </form>

        <Divider label="or continue with" />

        <div className="grid grid-cols-2 gap-2">
          <SocialButton provider="github" onClick={() => setShowWelcome(true)} />
          <SocialButton provider="google" onClick={() => setShowWelcome(true)} />
        </div>

        <p className="text-center text-xs text-[#8e9192] mt-1">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-blue-400 hover:text-blue-300 transition-colors focus:outline-none"
          >
            Create one
          </button>
        </p>

        <AuthFooter />
      </AuthCard>
    </>
  )
}
