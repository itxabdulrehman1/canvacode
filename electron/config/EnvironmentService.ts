import { app } from 'electron'
import * as path from 'path'
import * as fs from 'fs'

export class EnvironmentService {
  private static instance: EnvironmentService
  private appPath: string
  private userDataPath: string

  private constructor() {
    // If app is not initialized yet (e.g. during test), use home dir placeholder
    try {
      this.userDataPath = app.getPath('userData')
    } catch {
      const home = process.env.HOME || process.env.USERPROFILE || '.'
      this.userDataPath = path.join(home, '.canvascode')
    }
    this.appPath = app.getAppPath()
    this.ensureDirectoryStructure()
  }

  public static getInstance(): EnvironmentService {
    if (!EnvironmentService.instance) {
      EnvironmentService.instance = new EnvironmentService()
    }
    return EnvironmentService.instance;
  }

  public getUserDataPath(): string {
    return this.userDataPath
  }

  public getProjectsPath(): string {
    return path.join(this.userDataPath, 'projects')
  }

  public getLogsPath(): string {
    return path.join(this.userDataPath, 'logs')
  }

  public getBackupsPath(): string {
    return path.join(this.userDataPath, 'backups')
  }

  public getTempPath(): string {
    return path.join(this.userDataPath, 'temp')
  }

  public getCachePath(): string {
    return path.join(this.userDataPath, 'cache')
  }

  public getExportsPath(): string {
    return path.join(this.userDataPath, 'exports')
  }

  public getDatabasePath(): string {
    return path.join(this.userDataPath, 'canvascode.db')
  }

  public getEnv(): string {
    return process.env.NODE_ENV || 'development'
  }

  public isDev(): boolean {
    return this.getEnv() === 'development'
  }

  private ensureDirectoryStructure() {
    const paths = [
      this.getProjectsPath(),
      this.getLogsPath(),
      this.getBackupsPath(),
      this.getTempPath(),
      this.getCachePath(),
      this.getExportsPath(),
    ]

    for (const p of paths) {
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p, { recursive: true })
      }
    }
  }
}
