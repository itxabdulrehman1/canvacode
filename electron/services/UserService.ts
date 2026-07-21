import { v4 as uuidv4 } from 'uuid'
import { UserRepository } from '../repositories/UserRepository'
import { PasswordService } from './PasswordService'
import { ValidationService } from './ValidationService'
import { EmailExistsError, UserNotFoundError } from '../errors/AuthError'
import { LoggerService } from './LoggerService'

export class UserService {
  private static instance: UserService
  private userRepo: UserRepository
  private passwordService: PasswordService
  private validationService: ValidationService
  private logger: LoggerService

  private constructor() {
    this.userRepo = UserRepository.getInstance()
    this.passwordService = PasswordService.getInstance()
    this.validationService = ValidationService.getInstance()
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  public async registerUser(name: string, email: string, password: string) {
    this.logger.info(`Registering new user profile with email: ${email}`, 'UserService')

    // Perform validation checks
    const cleanName = this.validationService.validateRequired(name, 'Full name')
    const cleanEmail = this.validationService.validateEmail(email)
    this.validationService.validatePasswordStrength(password)

    // Check duplicate
    const existingUser = await this.userRepo.findByEmail(cleanEmail)
    if (existingUser) {
      this.logger.warn(`Registration failed: Duplicate email: ${cleanEmail}`, 'UserService')
      throw new EmailExistsError()
    }

    // Hash password
    const passwordHash = await this.passwordService.hashPassword(password)
    const userId = uuidv4()

    const newUser = await this.userRepo.createUser({
      id: userId,
      name: cleanName,
      email: cleanEmail,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    })

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }
  }

  public async getUserById(id: string) {
    const user = await this.userRepo.findById(id)
    if (!user) {
      throw new UserNotFoundError()
    }
    return user
  }

  public async getUserByEmail(email: string) {
    const cleanEmail = this.validationService.validateEmail(email)
    const user = await this.userRepo.findByEmail(cleanEmail)
    if (!user) {
      throw new UserNotFoundError()
    }
    return user
  }

  public async updateLastLogin(id: string): Promise<void> {
    await this.userRepo.updateLastLogin(id, new Date())
  }
}
