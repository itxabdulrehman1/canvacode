import { contextBridge, ipcRenderer } from 'electron'

// Types for IPC callbacks
interface ProjectConfig {
  id: string
  name: string
  framework: string
  createdAt: string
  updatedAt: string
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

// Expose safe APIs to the window context
contextBridge.exposeInMainWorld('canvasCodeAPI', {
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
  },
  settings: {
    getSettings: (): Promise<AppSettings> => ipcRenderer.invoke('settings:get'),
    updateSettings: (settings: Partial<AppSettings>): Promise<AppSettings> =>
      ipcRenderer.invoke('settings:update', settings),
    getRecentProjects: (): Promise<string[]> => ipcRenderer.invoke('settings:getRecent'),
  },
  projects: {
    listProjects: (): Promise<unknown[]> => ipcRenderer.invoke('projects:list'),
    createProject: (name: string, framework: string): Promise<ProjectConfig> =>
      ipcRenderer.invoke('projects:create', name, framework),
    openProject: (path: string): Promise<ProjectConfig> =>
      ipcRenderer.invoke('projects:open', path),
  },
  canvas: {
    load: (projectId: string) => ipcRenderer.invoke('canvas:load', projectId),
    save: (projectId: string, document: unknown): Promise<{ success: true }> => ipcRenderer.invoke('canvas:save', projectId, document),
  },
  componentTemplates: {
    getTemplate: (id: string, framework: string) => ipcRenderer.invoke('components:template', id, framework),
    getMetadata: (id: string) => ipcRenderer.invoke('components:metadata', id),
    getDependencies: (id: string) => ipcRenderer.invoke('components:dependencies', id),
  },
  ast: {
    generate: (projectId: string, document: unknown) => ipcRenderer.invoke('ast:generate', projectId, document),
    load: (projectId: string) => ipcRenderer.invoke('ast:load', projectId),
    validate: (projectId: string, document: unknown) => ipcRenderer.invoke('ast:validate', projectId, document),
    serialize: (projectId: string) => ipcRenderer.invoke('ast:serialize', projectId),
  },
  ai: {
    settings: () => ipcRenderer.invoke('ai:settings'), models: (provider: string) => ipcRenderer.invoke('ai:models', provider), save: (provider: string, model: string, apiKey?: string) => ipcRenderer.invoke('ai:save', provider, model, apiKey), removeKey: () => ipcRenderer.invoke('ai:removeKey'), test: () => ipcRenderer.invoke('ai:test'), request: (request: unknown) => ipcRenderer.invoke('ai:request', request), cancel: (id: string) => ipcRenderer.invoke('ai:cancel', id),
  },
  workspace: {
    tree: (projectId: string) => ipcRenderer.invoke('workspace:tree', projectId), read: (projectId: string, path: string) => ipcRenderer.invoke('workspace:read', projectId, path), save: (projectId: string, path: string, content: string) => ipcRenderer.invoke('workspace:save', projectId, path, content), create: (projectId: string, path: string, folder: boolean) => ipcRenderer.invoke('workspace:create', projectId, path, folder), rename: (projectId: string, from: string, to: string) => ipcRenderer.invoke('workspace:rename', projectId, from, to), delete: (projectId: string, path: string) => ipcRenderer.invoke('workspace:delete', projectId, path), export: (projectId: string, destination: string) => ipcRenderer.invoke('workspace:export', projectId, destination), exportDialog: (projectId: string) => ipcRenderer.invoke('workspace:exportDialog', projectId),
  },
  generation: {
    project: (projectId: string) => ipcRenderer.invoke('generation:project', projectId),
  },
  storage: {
    readTextFile: (path: string): Promise<string> => ipcRenderer.invoke('storage:read', path),
    writeTextFile: (path: string, content: string): Promise<void> =>
      ipcRenderer.invoke('storage:write', path, content),
    deleteFile: (path: string): Promise<void> => ipcRenderer.invoke('storage:delete', path),
    getDirectoryContents: (path: string): Promise<unknown[]> =>
      ipcRenderer.invoke('storage:readdir', path),
  },
  compiler: {
    compileProject: (path: string): Promise<{ success: boolean; logs: string[] }> =>
      ipcRenderer.invoke('compiler:compile', path),
  },
  auth: {
    register: (name: string, email: string, passwordString: string): Promise<{ success: boolean; data?: any; error?: string }> =>
      ipcRenderer.invoke('auth:register', name, email, passwordString),
    login: (email: string, passwordString: string, rememberMe: boolean): Promise<{ success: boolean; data?: any; error?: string }> =>
      ipcRenderer.invoke('auth:login', email, passwordString, rememberMe),
    logout: (): Promise<{ success: boolean; error?: string }> => ipcRenderer.invoke('auth:logout'),
    checkSession: (): Promise<{ success: boolean; data?: any; error?: string }> =>
      ipcRenderer.invoke('auth:checkSession'),
    resetPassword: (email: string): Promise<{ success: boolean; data?: { token: string }; error?: string }> =>
      ipcRenderer.invoke('auth:resetPassword', email),
  },
})
