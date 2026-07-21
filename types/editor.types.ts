// ─── Editor State Types ───────────────────────────────────────────────────────

export type EditorLanguage =
  | 'typescript'
  | 'javascript'
  | 'css'
  | 'html'
  | 'json'
  | 'markdown'
  | 'python'
  | 'rust'

export interface EditorTab {
  id: string
  fileId: string
  fileName: string
  language: EditorLanguage
  isDirty: boolean
  content: string
  cursorPosition?: { line: number; column: number }
}

export interface EditorSettings {
  theme: 'vs-dark' | 'light' | 'hc-black'
  fontSize: number
  tabSize: number
  wordWrap: 'on' | 'off' | 'bounded'
  minimap: boolean
  lineNumbers: boolean
  formatOnSave: boolean
}
