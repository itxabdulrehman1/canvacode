import * as crypto from 'crypto'
import { UserService } from './UserService'
import { SessionService } from './SessionService'
import { PasswordService } from './PasswordService'
import { SettingsService } from './SettingsService'
import { PasswordResetRepository } from '../repositories/PasswordResetRepository'
import { InvalidCredentialsError } from '../errors/AuthError'
import { LoggerService } from './LoggerService'

export class AuthenticationService {
  private static instance: AuthenticationService
  private userService: UserService
  private sessionService: SessionService
  private passwordService: PasswordService
  private settingsService: SettingsService
  private resetRepo: PasswordResetRepository
  private logger: LoggerService

  private constructor() {
    this.userService = UserService.getInstance()
    this.sessionService = SessionService.getInstance()
    this.passwordService = PasswordService.getInstance()
    this.settingsService = SettingsService.getInstance()
    this.resetRepo = PasswordResetRepository.getInstance()
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService()
    }
    return AuthenticationService.instance
  }

  public async register(name: string, email: string, password: string) {
    this.logger.info(`AuthenticationService: Registering new profile for ${email}`, 'AuthService')
    const user = await this.userService.registerUser(name, email, password)
    this.logger.info(`User successfully registered: ${user.id}`, 'AuthService')
    return user
  }

  public async login(email: string, password: string, rememberMe: boolean) {
    this.logger.info(`AuthenticationService: Login requested for ${email}`, 'AuthService')
    try {
      const user = await this.userService.getUserByEmail(email)

      // Compare password
      const passwordMatch = await this.passwordService.comparePassword(password, user.passwordHash)
      if (!passwordMatch) {
        this.logger.warn(`Login failed: Password comparison mismatched for ${email}`, 'AuthService')
        throw new InvalidCredentialsError()
      }

      // Create session
      const session = await this.sessionService.createSession(user.id, rememberMe)
      await this.userService.updateLastLogin(user.id)

      // Persist session ID in Electron Store settings
      const settings = this.settingsService.getSettings()
      // We will cast settings as any to append sessionId dynamically
      const updatedSettings = {
        ...settings,
        currentSessionId: session.id,
      }
      this.settingsService.updateSettings(updatedSettings as any)

      this.logger.info(`Login successful: User ${user.id} session established: ${session.id}`, 'AuthService')

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        sessionId: session.id,
      }
    } catch (error) {
      this.logger.warn(`Login validation failed for: ${email}`, 'AuthService')
      throw new InvalidCredentialsError()
    }
  }

  public async checkSession() {
    this.logger.debug('Checking app session persistence', 'AuthService')
    const settings = this.settingsService.getSettings() as any
    const sessionId = settings?.currentSessionId

    if (!sessionId) {
      this.logger.debug('No active session stored in settings', 'AuthService')
      return null
    }

    try {
      const session = await this.sessionService.validateSession(sessionId)
      const user = await this.userService.getUserById(session.userId)
      this.logger.info(`Restored active session for user: ${user.id}`, 'AuthService')

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    } catch {
      this.logger.info('Stored session expired or invalid. Clearing key.', 'AuthService')
      const updatedSettings = { ...settings }
      delete updatedSettings.currentSessionId
      this.settingsService.updateSettings(updatedSettings)
      return null
    }
  }

  public async logout() {
    const settings = this.settingsService.getSettings() as any
    const sessionId = settings?.currentSessionId

    if (sessionId) {
      this.logger.info(`Logging out session: ${sessionId}`, 'AuthService')
      await this.sessionService.destroySession(sessionId)
      const updatedSettings = { ...settings }
      delete updatedSettings.currentSessionId
      this.settingsService.updateSettings(updatedSettings)
    }
  }

  public async requestPasswordReset(email: string): Promise<string> {
    this.logger.info(`Password reset requested for: ${email}`, 'AuthService')
    const user = await this.userService.getUserByEmail(email)

    // Generate secure token
    const token = this.sessionService.generateToken()
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour expiration

    // Remove older tokens
    await this.resetRepo.deleteTokensByUserId(user.id)

    await this.resetRepo.createResetToken({
      id: token,
      tokenHash,
      userId: user.id,
      expiresAt,
      isUsed: false,
    })

    this.logger.info(`Password reset token successfully generated for: ${user.id}`, 'AuthService')

    return token // Returned internally as requested
  }
}
