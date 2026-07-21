import { AppError } from './AppError'

export class AuthError extends AppError {
  constructor(message: string, code = 'AUTH_ERROR', statusCode = 401) {
    super(message, code, statusCode)
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid email address or password.', 'INVALID_CREDENTIALS', 401)
  }
}

export class EmailExistsError extends AuthError {
  constructor() {
    super('An account with this email address already exists.', 'EMAIL_EXISTS', 409)
  }
}

export class WeakPasswordError extends AuthError {
  constructor(message = 'Password does not meet strength requirements.') {
    super(message, 'WEAK_PASSWORD', 400)
  }
}

export class ExpiredSessionError extends AuthError {
  constructor() {
    super('Your login session has expired. Please sign in again.', 'EXPIRED_SESSION', 401)
  }
}

export class UserNotFoundError extends AuthError {
  constructor() {
    super('User account not found.', 'USER_NOT_FOUND', 404)
  }
}
