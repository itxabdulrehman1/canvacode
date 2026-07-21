import Store from 'electron-store'

interface WindowState {
  width: number
  height: number
  x: number | undefined
  y: number | undefined
  isMaximized: boolean
}

interface AppSettings {
  autoSave: boolean
  autoSaveInterval: number
  theme: 'light' | 'dark' | 'system'
  editorPreferences: {
    fontSize: number
    tabSize: number
    minimap: boolean
    wordWrap: 'on' | 'off'
  }
}

interface StoreSchema {
  windowState: WindowState
  settings: AppSettings
  recentProjects: string[] // Array of project folder paths
}

const defaults: StoreSchema = {
  windowState: {
    width: 1200,
    height: 800,
    x: undefined,
    y: undefined,
    isMaximized: false,
  },
  settings: {
    autoSave: true,
    autoSaveInterval: 30,
    theme: 'dark',
    editorPreferences: {
      fontSize: 14,
      tabSize: 2,
      minimap: false,
      wordWrap: 'on',
    },
  },
  recentProjects: [],
}

export class ElectronStoreWrapper {
  private static instance: ElectronStoreWrapper
  private store: Store<StoreSchema>

  private constructor() {
    this.store = new Store<StoreSchema>({
      name: 'canvascode-config',
      defaults,
    })
  }

  public static getInstance(): ElectronStoreWrapper {
    if (!ElectronStoreWrapper.instance) {
      ElectronStoreWrapper.instance = new ElectronStoreWrapper()
    }
    return ElectronStoreWrapper.instance
  }

  public get<K extends keyof StoreSchema>(key: K): StoreSchema[K] {
    return this.store.get(key)
  }

  public set<K extends keyof StoreSchema>(key: K, value: StoreSchema[K]): void {
    this.store.set(key, value)
  }

  public reset(): void {
    this.store.clear()
  }
}
