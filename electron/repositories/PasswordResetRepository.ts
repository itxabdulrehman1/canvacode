import { eq, and } from 'drizzle-orm'
import { getDatabaseConnection } from '../db/connection'
import { passwordResetTokens } from '../db/schema'

export interface PasswordResetTokenInsert {
  id: string
  tokenHash: string
  userId: string
  expiresAt: Date
  isUsed?: boolean
}

export class PasswordResetRepository {
  private static instance: PasswordResetRepository

  private constructor() {}

  public static getInstance(): PasswordResetRepository {
    if (!PasswordResetRepository.instance) {
      PasswordResetRepository.instance = new PasswordResetRepository()
    }
    return PasswordResetRepository.instance
  }

  private get db() {
    return getDatabaseConnection()
  }

  public async createResetToken(token: PasswordResetTokenInsert) {
    await this.db.insert(passwordResetTokens).values(token)
    return token
  }

  public async findTokenById(id: string) {
    const results = await this.db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.id, id))
      .limit(1)
    return results[0] || null
  }

  public async markTokenAsUsed(id: string): Promise<void> {
    await this.db
      .update(passwordResetTokens)
      .set({ isUsed: true })
      .where(eq(passwordResetTokens.id, id))
  }

  public async deleteTokensByUserId(userId: string): Promise<void> {
    await this.db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId))
  }
}
