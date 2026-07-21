import * as fs from 'fs'
import * as path from 'path'
import { EnvironmentService } from '../config/EnvironmentService'
import type { GeneratedFile } from '../../types/generation.types'
import type { WorkspaceEntry } from '../../types/workspace.types'

export class WorkspaceService {
  private root(projectId: string) { if (!/^[a-zA-Z0-9_-]{1,128}$/.test(projectId)) throw new Error('Invalid project id'); return path.join(EnvironmentService.getInstance().getProjectsPath(), projectId, 'generated') }
  private resolve(projectId: string, relativePath: string) { const root = this.root(projectId); const target = path.resolve(root, relativePath); if (!target.startsWith(`${path.resolve(root)}${path.sep}`) && target !== path.resolve(root)) throw new Error('Invalid workspace path'); return target }
  writeGenerated(projectId: string, files: GeneratedFile[]) { files.forEach((file) => { const target = this.resolve(projectId, file.path); fs.mkdirSync(path.dirname(target), { recursive: true }); if (fs.existsSync(target)) return; fs.writeFileSync(target, file.content, 'utf8') }); return this.tree(projectId) }
  tree(projectId: string, relativePath = ''): WorkspaceEntry[] { const target = this.resolve(projectId, relativePath); if (!fs.existsSync(target)) return []; return fs.readdirSync(target, { withFileTypes: true }).sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name)).map((entry) => { const child = path.join(relativePath, entry.name); return { path: child.replace(/\\/g, '/'), name: entry.name, type: entry.isDirectory() ? 'folder' : 'file', children: entry.isDirectory() ? this.tree(projectId, child) : undefined, generated: true } }) }
  read(projectId: string, relativePath: string) { return fs.readFileSync(this.resolve(projectId, relativePath), 'utf8') }
  save(projectId: string, relativePath: string, content: string) { const target = this.resolve(projectId, relativePath); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, content, 'utf8') }
  create(projectId: string, relativePath: string, folder = false) { const target = this.resolve(projectId, relativePath); if (fs.existsSync(target)) throw new Error('Workspace entry already exists'); if (folder) fs.mkdirSync(target, { recursive: true }); else { fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, '', 'utf8') }; return this.tree(projectId) }
  rename(projectId: string, from: string, to: string) { const source = this.resolve(projectId, from); const target = this.resolve(projectId, to); if (!fs.existsSync(source) || fs.existsSync(target)) throw new Error('Unable to rename workspace entry'); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.renameSync(source, target); return this.tree(projectId) }
  remove(projectId: string, relativePath: string) { const target = this.resolve(projectId, relativePath); if (!fs.existsSync(target)) throw new Error('Workspace entry does not exist'); fs.rmSync(target, { recursive: true, force: false }); return this.tree(projectId) }
  export(projectId: string, destination: string) { const root = this.root(projectId); if (!fs.existsSync(root)) throw new Error('Generated workspace does not exist'); fs.cpSync(root, destination, { recursive: true, errorOnExist: false }); return destination }
}
