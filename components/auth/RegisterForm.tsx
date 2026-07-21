'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { useAuthStore } from '@/stores/authStore'
import { RegisterSchema, type RegisterInput } from '@/lib/validations/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { AuthCard } from './AuthCard'
import { AuthHeader } from './AuthHeader'
import { AuthFooter } from './AuthFooter'
import { EmailField } from './EmailField'
import { PasswordField } from './PasswordField'
import { AuthAlert } from './AuthAlert'
import { LoadingScreen } from './LoadingScreen'
import { WelcomeScreen } from './WelcomeScreen'

export function RegisterForm() {
  const router = useRouter()
  const [successMessage, setSuccessMessage] = React.useState<string | undefined>(undefined)

  const { registerAction, isLoading, error } = useAuthStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const passwordVal = watch('password', '')

  // Password strength logic
  const getPasswordStrength = (password: string) => {
    let score = 0
    if (!password) return 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }

  const strength = getPasswordStrength(passwordVal)
  const strengthColor = ['bg-red-500', 'bg-amber-500', 'bg-yellow-500', 'bg-green-500'][strength - 1] || 'bg-[#201f1f]'
  const strengthText = ['Weak', 'Fair', 'Good', 'Strong'][strength - 1] || ''

  const onSubmit = async (data: RegisterInput) => {
    setSuccessMessage(undefined)

    const result = await registerAction(data.name, data.email, data.password)
    if (result.success) {
      setSuccessMessage('Account created successfully! Redirecting to login...')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  }

  const handleWelcomeComplete = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen message="Creating developer profile…" />}
      </AnimatePresence>

      <AuthCard>
        <AuthHeader
          title="Create Account"
          description="Join CanvasCode and start building visually"
        />

        <AuthAlert type="error" message={error || undefined} />
        <AuthAlert type="success" message={successMessage} />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Full name"
            type="text"
            placeholder="Your full name"
            leftIcon={<User className="h-3.5 w-3.5" />}
            errorText={errors.name?.message}
            id="register-name"
            {...register('name')}
          />

          <EmailField
            registration={register('email')}
            errorText={errors.email?.message}
            id="register-email"
          />

          <div className="flex flex-col gap-1.5">
            <PasswordField
              label="Password"
              placeholder="Create strong password"
              registration={register('password')}
              errorText={errors.password?.message}
              id="register-password"
            />
            {passwordVal && (
              <div className="flex flex-col gap-1 px-0.5">
                <div className="flex items-center justify-between text-[10px] text-[#8e9192]">
                  <span>Password strength</span>
                  <span className="font-semibold text-[#e5e2e1]">{strengthText}</span>
                </div>
                <div className="w-full h-1 bg-[#201f1f] rounded-full overflow-hidden border border-[#353434]">
                  <div
                    className={`h-full transition-all duration-300 ${strengthColor}`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <PasswordField
            label="Confirm Password"
            placeholder="Repeat password"
            registration={register('confirmPassword')}
            errorText={errors.confirmPassword?.message}
            id="register-confirm-password"
          />

          <Checkbox
            label="I agree to the Terms and Conditions"
            id="register-terms"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full mt-2"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-[#8e9192] mt-1">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-blue-400 hover:text-blue-300 transition-colors focus:outline-none"
          >
            Sign in
          </button>
        </p>

        <AuthFooter />
      </AuthCard>
    </>
  )
}
