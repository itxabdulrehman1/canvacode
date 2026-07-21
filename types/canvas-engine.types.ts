import type { Edge, Node, Viewport } from '@xyflow/react'

export type CanvasNodeType = 'button' | 'text' | 'heading' | 'input' | 'textarea' | 'image' | 'card' | 'container' | 'divider' | 'spacer' | 'checkbox' | 'radio' | 'switch' | 'select' | 'button-group' | 'section' | 'grid' | 'flex' | 'stack' | 'avatar' | 'icon' | 'badge' | 'alert' | 'progress' | 'spinner' | 'navbar' | 'sidebar' | 'tabs' | 'breadcrumb' | 'pagination' | 'dialog' | 'drawer' | 'tooltip' | 'toast'

export interface CanvasNodeData extends Record<string, unknown> {
  label: string
  width: number
  height: number
  properties: Record<string, unknown>
  children: string[]
  createdAt: string
  updatedAt: string
  locked: boolean
  visible?: boolean
}

export type CanvasNode = Node<CanvasNodeData, CanvasNodeType>

export interface CanvasDocument { nodes: CanvasNode[]; edges: Edge[]; viewport: Viewport; selection?: string[]; toolbar?: { gridVisible: boolean; snapToGrid: boolean } }
