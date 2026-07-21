import * as path from 'path'
import { EnvironmentService } from '../config/EnvironmentService'
import { StorageService } from './StorageService'
import { SettingsService } from './SettingsService'
import { LoggerService } from './LoggerService'

export interface ProjectConfig {
  id: string
  name: string
  framework: string
  createdAt: string
  updatedAt: string
}

export class ProjectService {
  private static instance: ProjectService
  private envService: EnvironmentService
  private storageService: StorageService
  private settingsService: SettingsService
  private logger: LoggerService

  private constructor() {
    this.envService = EnvironmentService.getInstance()
    this.storageService = StorageService.getInstance()
    this.settingsService = SettingsService.getInstance()
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService()
    }
    return ProjectService.instance
  }

  public listProjects() {
    this.logger.info('Listing projects', 'ProjectService')
    const projectsDir = this.envService.getProjectsPath()
    this.storageService.createDirectory(projectsDir)
    return this.storageService.getDirectoryContents(projectsDir)
  }

  public createProject(name: string, framework: string): ProjectConfig {
    this.logger.info(`Creating project: ${name} with framework: ${framework}`, 'ProjectService')
    const projectId = crypto.randomUUID()
    const projectDir = path.join(this.envService.getProjectsPath(), projectId)
    this.storageService.createDirectory(projectDir)

    const config: ProjectConfig = {
      id: projectId,
      name,
      framework,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const configPath = path.join(projectDir, 'canvascode.json')
    this.storageService.writeTextFile(configPath, JSON.stringify(config, null, 2))
    this.settingsService.addRecentProject(projectDir)

    return config
  }

  public openProject(projectDir: string): ProjectConfig {
    this.logger.info(`Opening project at: ${projectDir}`, 'ProjectService')
    const configPath = path.join(projectDir, 'canvascode.json')
    const rawContent = this.storageService.readTextFile(configPath)
    const config = JSON.parse(rawContent) as ProjectConfig

    config.updatedAt = new Date().toISOString()
    this.storageService.writeTextFile(configPath, JSON.stringify(config, null, 2))
    this.settingsService.addRecentProject(projectDir)

    return config
  }
}
