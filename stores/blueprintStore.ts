import { create } from 'zustand'
import type { BlueprintNode, BlueprintEdge } from '@/types/blueprint.types'

interface BlueprintState {
  nodes: BlueprintNode[]
  edges: BlueprintEdge[]
  selectedNodeId: string | null
  isReadOnly: boolean

  setNodes: (nodes: BlueprintNode[]) => void
  setEdges: (edges: BlueprintEdge[]) => void
  addNode: (node: BlueprintNode) => void
  removeNode: (id: string) => void
  addEdge: (edge: BlueprintEdge) => void
  removeEdge: (id: string) => void
  selectNode: (id: string | null) => void
  setReadOnly: (value: boolean) => void
}

export const useBlueprintStore = create<BlueprintState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isReadOnly: false,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  removeNode: (id) =>
    set((state) => ({ nodes: state.nodes.filter((n) => n.id !== id) })),
  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
  removeEdge: (id) =>
    set((state) => ({ edges: state.edges.filter((e) => e.id !== id) })),
  selectNode: (id) => set({ selectedNodeId: id }),
  setReadOnly: (value) => set({ isReadOnly: value }),
}))
