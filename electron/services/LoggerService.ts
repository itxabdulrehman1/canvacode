import * as fs from 'fs'
import * as path from 'path'
import { EnvironmentService } from '../config/EnvironmentService'

export class LoggerService {
  private static instance: LoggerService
  private logFilePath: string
  private envService: EnvironmentService

  private constructor() {
    this.envService = EnvironmentService.getInstance()
    const logsDir = this.envService.getLogsPath()
    this.logFilePath = path.join(logsDir, 'canvascode.log')
    this.setupGlobalHandlers()
  }

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService()
    }
    return LoggerService.instance
  }

  public info(message: string, context?: string) {
    this.writeLog('INFO', message, context)
  }

  public warn(message: string, context?: string) {
    this.writeLog('WARN', message, context)
  }

  public error(message: string, error?: Error | unknown, context?: string) {
    let errorString = ''
    if (error instanceof Error) {
      errorString = `\n${error.stack}`
    } else if (error) {
      errorString = `\n${JSON.stringify(error)}`
    }
    this.writeLog('ERROR', `${message}${errorString}`, context)
  }

  public debug(message: string, context?: string) {
    if (this.envService.isDev()) {
      this.writeLog('DEBUG', message, context)
    }
  }

  private writeLog(level: string, message: string, context?: string) {
    const timestamp = new Date().toISOString()
    const ctxString = context ? ` [${context}]` : ''
    const logLine = `[${timestamp}] [${level}]${ctxString}: ${message}\n`

    // Log to console
    if (level === 'ERROR') {
      console.error(logLine.trim())
    } else if (level === 'WARN') {
      console.warn(logLine.trim())
    } else {
      console.log(logLine.trim())
    }

    // Log to file
    try {
      fs.appendFileSync(this.logFilePath, logLine, 'utf8')
    } catch (err) {
      console.error('Failed to write to log file:', err)
    }
  }

  private setupGlobalHandlers() {
    process.on('uncaughtException', (error) => {
      this.error('Uncaught Exception', error, 'System')
      // Gracefully exit or alert
    })

    process.on('unhandledRejection', (reason, promise) => {
      this.error(`Unhandled Rejection at Promise: ${promise}`, reason, 'System')
    })
  }
}
