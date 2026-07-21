export interface GeneratedFile { path: string; content: string; language: string }
export interface GenerationResult { id: string; files: GeneratedFile[]; warnings: string[]; errors: string[]; logs: string[] }
