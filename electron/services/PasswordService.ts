import * as bcrypt from 'bcryptjs'
import { LoggerService } from './LoggerService'

export class PasswordService {
  private static instance: PasswordService
  private logger: LoggerService
  private saltRounds = 10

  private constructor() {
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): PasswordService {
    if (!PasswordService.instance) {
      PasswordService.instance = new PasswordService()
    }
    return PasswordService.instance
  }

  public async hashPassword(password: string): Promise<string> {
    this.logger.debug('Hashing password', 'PasswordService')
    return bcrypt.hash(password, this.saltRounds)
  }

  public async comparePassword(password: string, hash: string): Promise<boolean> {
    this.logger.debug('Comparing password hash', 'PasswordService')
    return bcrypt.compare(password, hash)
  }
}
