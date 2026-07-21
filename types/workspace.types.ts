export interface WorkspaceEntry { path: string; name: string; type: 'file' | 'folder'; children?: WorkspaceEntry[]; modified?: boolean; locked?: boolean; generated?: boolean }
export interface WorkspaceDocument { path: string; content: string; modified: boolean }
