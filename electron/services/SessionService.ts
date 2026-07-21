import * as crypto from 'crypto'
import { SessionRepository } from '../repositories/SessionRepository'
import { LoggerService } from './LoggerService'
import { ExpiredSessionError } from '../errors/AuthError'

export class SessionService {
  private static instance: SessionService
  private sessionRepo: SessionRepository
  private logger: LoggerService

  // Defaults: Standard session 2 hours, Remember Me 30 days
  private standardSessionDuration = 2 * 60 * 60 * 1000
  private rememberMeDuration = 30 * 24 * 60 * 60 * 1000

  private constructor() {
    this.sessionRepo = SessionRepository.getInstance()
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService()
    }
    return SessionService.instance
  }

  public generateToken(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  public async createSession(userId: string, rememberMe: boolean) {
    const sessionId = this.generateToken()
    const duration = rememberMe ? this.rememberMeDuration : this.standardSessionDuration
    const expiresAt = new Date(Date.now() + duration)

    this.logger.info(`Creating session for user: ${userId} (Remember Me: ${rememberMe})`, 'SessionService')

    const session = await this.sessionRepo.createSession({
      id: sessionId,
      userId,
      expiresAt,
      isActive: true,
    })

    if (rememberMe) {
      // Save a remember token
      const tokenId = this.generateToken()
      const tokenHash = crypto.createHash('sha256').update(tokenId).digest('hex')
      await this.sessionRepo.createRememberToken({
        id: tokenId,
        tokenHash,
        userId,
        expiresAt,
      })
    }

    return session
  }

  public async validateSession(sessionId: string) {
    this.logger.debug(`Validating session: ${sessionId}`, 'SessionService')
    const session = await this.sessionRepo.findSessionById(sessionId)

    if (!session || !session.isActive) {
      this.logger.warn(`Session validation failed: Session inactive or missing`, 'SessionService')
      throw new ExpiredSessionError()
    }

    if (session.expiresAt.getTime() < Date.now()) {
      this.logger.warn(`Session validation failed: Session expired`, 'SessionService')
      await this.sessionRepo.deleteSession(sessionId)
      throw new ExpiredSessionError()
    }

    return session
  }

  public async destroySession(sessionId: string): Promise<void> {
    this.logger.info(`Destroying session: ${sessionId}`, 'SessionService')
    await this.sessionRepo.deleteSession(sessionId)
  }

  public async destroyAllRememberTokens(userId: string): Promise<void> {
    this.logger.info(`Destroying all remember tokens for user: ${userId}`, 'SessionService')
    await this.sessionRepo.deleteRememberTokensByUserId(userId)
  }
}
