// ─── Blueprint / Node Graph Types ────────────────────────────────────────────

export type BlueprintNodeType =
  | 'api'
  | 'database'
  | 'auth'
  | 'function'
  | 'webhook'
  | 'scheduler'
  | 'storage'
  | 'email'
  | 'transform'
  | 'condition'
  | 'output'

export interface BlueprintNodeData {
  label: string
  description?: string
  type: BlueprintNodeType
  config?: Record<string, unknown>
  status?: 'idle' | 'running' | 'success' | 'error'
}

export interface BlueprintNode {
  id: string
  type: BlueprintNodeType
  position: { x: number; y: number }
  data: BlueprintNodeData
}

export interface BlueprintEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  label?: string
  animated?: boolean
}

export type BlueprintGraph = {
  nodes: BlueprintNode[]
  edges: BlueprintEdge[]
}
