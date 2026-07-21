import { eq } from 'drizzle-orm'
import { getDatabaseConnection } from '../db/connection'
import { users } from '../db/schema'

export interface UserInsert {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
  isActive?: boolean
}

export class UserRepository {
  private static instance: UserRepository

  private constructor() {}

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository()
    }
    return UserRepository.instance
  }

  private get db() {
    return getDatabaseConnection()
  }

  public async findById(id: string) {
    const results = await this.db.select().from(users).where(eq(users.id, id)).limit(1)
    return results[0] || null
  }

  public async findByEmail(email: string) {
    const results = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1)
    return results[0] || null
  }

  public async createUser(user: UserInsert) {
    const normalizedUser = {
      ...user,
      email: user.email.toLowerCase().trim(),
    }
    await this.db.insert(users).values(normalizedUser)
    return normalizedUser
  }

  public async updateLastLogin(id: string, timestamp: Date): Promise<void> {
    await this.db.update(users).set({ lastLogin: timestamp, updatedAt: new Date() }).where(eq(users.id, id))
  }

  public async updatePassword(id: string, passwordHash: string): Promise<void> {
    await this.db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, id))
  }
}
