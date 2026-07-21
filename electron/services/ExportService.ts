import { LoggerService } from './LoggerService'

export class ExportService {
  private static instance: ExportService
  private logger: LoggerService

  private constructor() {
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): ExportService {
    if (!ExportService.instance) {
      ExportService.instance = new ExportService()
    }
    return ExportService.instance
  }

  public async exportProjectAsZip(projectPath: string, destPath: string): Promise<boolean> {
    this.logger.info(`Export request: ${projectPath} -> ${destPath}`, 'ExportService')
    // Stub representation
    return true
  }
}
