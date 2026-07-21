import { ElectronStoreWrapper } from '../store/ElectronStoreWrapper'
import { LoggerService } from './LoggerService'

export class SettingsService {
  private static instance: SettingsService
  private store: ElectronStoreWrapper
  private logger: LoggerService

  private constructor() {
    this.store = ElectronStoreWrapper.getInstance()
    this.logger = LoggerService.getInstance()
  }

  public static getInstance(): SettingsService {
    if (!SettingsService.instance) {
      SettingsService.instance = new SettingsService()
    }
    return SettingsService.instance
  }

  public getSettings() {
    this.logger.debug('Getting app settings', 'SettingsService')
    return this.store.get('settings')
  }

  public updateSettings(settings: Partial<ReturnType<this['getSettings']>>) {
    this.logger.info('Updating app settings', 'SettingsService')
    const current = this.store.get('settings')
    this.store.set('settings', {
      ...current,
      ...settings,
      editorPreferences: {
        ...current.editorPreferences,
        ...(settings.editorPreferences || {}),
      },
    })
    return this.store.get('settings')
  }

  public getRecentProjects(): string[] {
    return this.store.get('recentProjects')
  }

  public addRecentProject(projectPath: string): void {
    const current = this.getRecentProjects()
    const updated = [projectPath, ...current.filter((p) => p !== projectPath)].slice(0, 10)
    this.store.set('recentProjects', updated)
  }

  public removeRecentProject(projectPath: string): void {
    const current = this.getRecentProjects()
    this.store.set(
      'recentProjects',
      current.filter((p) => p !== projectPath)
    )
  }

  public getWindowState() {
    return this.store.get('windowState')
  }

  public saveWindowState(width: number, height: number, x: number | undefined, y: number | undefined, isMaximized: boolean) {
    this.store.set('windowState', { width, height, x, y, isMaximized })
  }
}
