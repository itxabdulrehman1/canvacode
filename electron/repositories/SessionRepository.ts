import { eq, and } from 'drizzle-orm'
import { getDatabaseConnection } from '../db/connection'
import { sessions, rememberTokens } from '../db/schema'

export interface SessionInsert {
  id: string
  userId: string
  expiresAt: Date
  isActive?: boolean
}

export interface RememberTokenInsert {
  id: string
  tokenHash: string
  userId: string
  expiresAt: Date
}

export class SessionRepository {
  private static instance: SessionRepository

  private constructor() {}

  public static getInstance(): SessionRepository {
    if (!SessionRepository.instance) {
      SessionRepository.instance = new SessionRepository()
    }
    return SessionRepository.instance
  }

  private get db() {
    return getDatabaseConnection()
  }

  // --- Session Operations ---

  public async findSessionById(id: string) {
    const results = await this.db.select().from(sessions).where(eq(sessions.id, id)).limit(1)
    return results[0] || null
  }

  public async createSession(session: SessionInsert) {
    await this.db.insert(sessions).values(session)
    return session
  }

  public async invalidateSession(id: string): Promise<void> {
    await this.db.update(sessions).set({ isActive: false }).where(eq(sessions.id, id))
  }

  public async deleteSession(id: string): Promise<void> {
    await this.db.delete(sessions).where(eq(sessions.id, id))
  }

  public async deleteExpiredSessions(now: Date): Promise<void> {
    // Alternatively delete from database directly
    await this.db.delete(sessions).where(eq(sessions.isActive, false))
  }

  // --- Remember Me Operations ---

  public async createRememberToken(token: RememberTokenInsert) {
    await this.db.insert(rememberTokens).values(token)
    return token
  }

  public async findRememberTokenById(id: string) {
    const results = await this.db.select().from(rememberTokens).where(eq(rememberTokens.id, id)).limit(1)
    return results[0] || null
  }

  public async deleteRememberToken(id: string): Promise<void> {
    await this.db.delete(rememberTokens).where(eq(rememberTokens.id, id))
  }

  public async deleteRememberTokensByUserId(userId: string): Promise<void> {
    await this.db.delete(rememberTokens).where(eq(rememberTokens.userId, userId))
  }
}
