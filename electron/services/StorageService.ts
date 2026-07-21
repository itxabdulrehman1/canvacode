import * as fs from 'fs'
import * as path from 'path'
import { LoggerService } from './LoggerService'
import { StorageError } from '../errors/AppError'

export class StorageService {
  private static instance: StorageService
  private logger: LoggerService

  private constructor() {
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService()
    }
    return StorageService.instance
  }

  public writeTextFile(filePath: string, content: string): void {
    try {
      this.logger.debug(`Writing file to ${filePath}`, 'StorageService')
      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(filePath, content, 'utf8')
    } catch (error) {
      this.logger.error(`Failed to write text file: ${filePath}`, error, 'StorageService')
      throw new StorageError(`Failed to write file: ${filePath}`, error)
    }
  }

  public readTextFile(filePath: string): string {
    try {
      this.logger.debug(`Reading file from ${filePath}`, 'StorageService')
      if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist')
      }
      return fs.readFileSync(filePath, 'utf8')
    } catch (error) {
      this.logger.error(`Failed to read text file: ${filePath}`, error, 'StorageService')
      throw new StorageError(`Failed to read file: ${filePath}`, error)
    }
  }

  public deleteFile(filePath: string): void {
    try {
      this.logger.info(`Deleting file: ${filePath}`, 'StorageService')
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    } catch (error) {
      this.logger.error(`Failed to delete file: ${filePath}`, error, 'StorageService')
      throw new StorageError(`Failed to delete file: ${filePath}`, error)
    }
  }

  public createDirectory(dirPath: string): void {
    try {
      if (!fs.existsSync(dirPath)) {
        this.logger.info(`Creating directory: ${dirPath}`, 'StorageService')
        fs.mkdirSync(dirPath, { recursive: true })
      }
    } catch (error) {
      this.logger.error(`Failed to create directory: ${dirPath}`, error, 'StorageService')
      throw new StorageError(`Failed to create directory: ${dirPath}`, error)
    }
  }

  public getDirectoryContents(dirPath: string) {
    try {
      if (!fs.existsSync(dirPath)) {
        return []
      }
      const files = fs.readdirSync(dirPath, { withFileTypes: true })
      return files.map((file) => ({
        name: file.name,
        isDirectory: file.isDirectory(),
        sizeBytes: file.isDirectory() ? 0 : fs.statSync(path.join(dirPath, file.name)).size,
      }))
    } catch (error) {
      this.logger.error(`Failed to read directory: ${dirPath}`, error, 'StorageService')
      throw new StorageError(`Failed to read directory: ${dirPath}`, error)
    }
  }
}
