interface Window {
  canvasCodeAPI: {
    window: {
      minimize: () => Promise<void>
      maximize: () => Promise<void>
      close: () => Promise<void>
    }
    settings: {
      getSettings: () => Promise<any>
      updateSettings: (settings: any) => Promise<any>
      getRecentProjects: () => Promise<string[]>
    }
    projects: {
      listProjects: () => Promise<any[]>
      createProject: (name: string, framework: string) => Promise<any>
      openProject: (path: string) => Promise<any>
    }
    canvas: {
      load: (projectId: string) => Promise<any>
      save: (projectId: string, document: any) => Promise<{ success: true }>
    }
    componentTemplates: {
      getTemplate: (id: string, framework: 'react' | 'next' | 'jsx' | 'typescript' | 'shadcn') => Promise<any>
      getMetadata: (id: string) => Promise<any>
      getDependencies: (id: string) => Promise<string[]>
    }
    workspace: { tree: (projectId: string) => Promise<any[]>; read: (projectId: string, path: string) => Promise<string>; save: (projectId: string, path: string, content: string) => Promise<void>; create: (projectId: string, path: string, folder: boolean) => Promise<any[]>; rename: (projectId: string, from: string, to: string) => Promise<any[]>; delete: (projectId: string, path: string) => Promise<any[]>; export: (projectId: string, destination: string) => Promise<string>; exportDialog: (projectId: string) => Promise<string | null> }
    generation: { project: (projectId: string) => Promise<{ files: { path: string }[]; warnings: string[]; errors: string[] }> }
    storage: {
      readTextFile: (path: string) => Promise<string>
      writeTextFile: (path: string, content: string) => Promise<void>
      deleteFile: (path: string) => Promise<void>
      getDirectoryContents: (path: string) => Promise<any[]>
    }
    compiler: {
      compileProject: (path: string) => Promise<{ success: boolean; logs: string[] }>
    }
    auth: {
      register: (name: string, email: string, passwordString: string) => Promise<{ success: boolean; data?: any; error?: string }>
      login: (email: string, passwordString: string, rememberMe: boolean) => Promise<{ success: boolean; data?: any; error?: string }>
      logout: () => Promise<{ success: boolean; error?: string }>
      checkSession: () => Promise<{ success: boolean; data?: any; error?: string }>
      resetPassword: (email: string) => Promise<{ success: boolean; data?: { token: string }; error?: string }>
    }
  }
}
