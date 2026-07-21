// ─── Project Types ───────────────────────────────────────────────────────────

export type ProjectStatus = 'draft' | 'active' | 'archived' | 'published'

export type ProjectFramework = 'next' | 'react' | 'vue' | 'svelte' | 'astro'

export interface ProjectMeta {
  id: string
  name: string
  description?: string
  framework: ProjectFramework
  status: ProjectStatus
  createdAt: string
  updatedAt: string
  thumbnailUrl?: string
  tags: string[]
}

export interface ProjectFile {
  id: string
  name: string
  path: string
  type: 'file' | 'folder'
  language?: string
  children?: ProjectFile[]
}

export interface RecentProject extends Pick<ProjectMeta, 'id' | 'name' | 'status' | 'updatedAt' | 'thumbnailUrl'> {
  lastOpenedAt: string
}
