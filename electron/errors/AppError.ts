export class AppError extends Error {
  public readonly code: string
  public readonly statusCode: number

  constructor(message: string, code = 'INTERNAL_ERROR', statusCode = 500) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'DATABASE_ERROR', 500)
    if (originalError) {
      this.stack = `${this.stack}\nCaused by: ${originalError instanceof Error ? originalError.stack : JSON.stringify(originalError)}`
    }
  }
}

export class StorageError extends AppError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'STORAGE_ERROR', 500)
    if (originalError) {
      this.stack = `${this.stack}\nCaused by: ${originalError instanceof Error ? originalError.stack : JSON.stringify(originalError)}`
    }
  }
}

export class SettingsError extends AppError {
  constructor(message: string) {
    super(message, 'SETTINGS_ERROR', 400)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
  }
}
