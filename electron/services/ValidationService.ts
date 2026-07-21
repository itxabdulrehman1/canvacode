import { z } from 'zod'
import { ValidationError } from '../errors/AppError'
import { WeakPasswordError } from '../errors/AuthError'

export class ValidationService {
  private static instance: ValidationService

  private constructor() {}

  public static getInstance(): ValidationService {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService()
    }
    return ValidationService.instance
  }

  public validateEmail(email: string): string {
    const emailSchema = z.string().email('Invalid email address format.')
    const result = emailSchema.safeParse(email)
    if (!result.success) {
      throw new ValidationError(result.error.issues[0].message)
    }
    return email.toLowerCase().trim()
  }

  public validatePasswordStrength(password: string): void {
    if (!password || password.length < 8) {
      throw new WeakPasswordError('Password must be at least 8 characters long.')
    }
    if (!/[0-9]/.test(password)) {
      throw new WeakPasswordError('Password must contain at least one numeric digit.')
    }
    if (!/[A-Z]/.test(password)) {
      throw new WeakPasswordError('Password must contain at least one uppercase letter.')
    }
  }

  public validateRequired(value: string | undefined, fieldName: string): string {
    if (!value || value.trim() === '') {
      throw new ValidationError(`${fieldName} is a required field.`)
    }
    return value.trim()
  }
}
