'use client'
import * as React from 'react'
import Editor from '@monaco-editor/react'
import { FileCode2 } from 'lucide-react'
import type { WorkspaceEntry } from '@/types/workspace.types'

const flatten = (entries: WorkspaceEntry[]): WorkspaceEntry[] => entries.flatMap((entry) => [entry, ...(entry.children ? flatten(entry.children) : [])])
export function BackendCodePanel({ projectId }: { projectId: string }) {
  const [files, setFiles] = React.useState<WorkspaceEntry[]>([]); const [path, setPath] = React.useState<string | null>(null); const [code, setCode] = React.useState('')
  React.useEffect(() => { const workspace = window.canvasCodeAPI?.workspace; if (!workspace) { setFiles([]); return }; workspace.tree(projectId).then((tree) => setFiles(flatten(tree as WorkspaceEntry[]))).catch(() => setFiles([])) }, [projectId])
  const backend = files.filter((file) => file.type === 'file' && /^(routes|controllers|services|repositories|middleware|prisma)\//.test(file.path))
  const open = async (file: WorkspaceEntry) => { const workspace = window.canvasCodeAPI?.workspace; if (!workspace) return; setPath(file.path); setCode(await workspace.read(projectId, file.path)) }
  return <section className="flex min-w-0 flex-1 flex-col border-l border-[#1c1b1b] bg-[#101010]"><header className="flex h-10 items-center gap-2 border-b border-[#1c1b1b] px-3"><FileCode2 className="h-4 w-4 text-blue-400"/><span className="text-xs font-semibold uppercase tracking-wider text-[#c4c7c8]">Backend code</span></header>{backend.length ? <><select value={path ?? ''} onChange={(event) => { const file = backend.find((item) => item.path === event.target.value); if (file) void open(file) }} className="m-2 h-7 rounded border border-[#353434] bg-[#141313] px-2 text-xs text-white"><option value="">Select a generated backend file</option>{backend.map((file) => <option key={file.path} value={file.path}>{file.path}</option>)}</select>{path ? <Editor height="100%" theme="vs-dark" language="typescript" value={code} options={{ readOnly: false, minimap: { enabled: true }, automaticLayout: true }} onChange={(value) => setCode(value ?? '')}/> : <div className="p-4 text-xs text-[#777]">Select a file to inspect its generated backend code.</div>}</> : <div className="p-4 text-xs leading-relaxed text-[#777]">Backend code will appear here after a successful code-generation run creates routes, controllers, services, or Prisma files.</div>}</section>
}
