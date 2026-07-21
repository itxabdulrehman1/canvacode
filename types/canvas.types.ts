// ─── Canvas Element Types ─────────────────────────────────────────────────────

export type CanvasElementType =
  | 'frame'
  | 'text'
  | 'image'
  | 'rectangle'
  | 'ellipse'
  | 'button'
  | 'input'
  | 'container'
  | 'icon'

export type Position = { x: number; y: number }
export type Size = { width: number; height: number }

export interface CanvasElement {
  id: string
  type: CanvasElementType
  name: string
  position: Position
  size: Size
  visible: boolean
  locked: boolean
  parentId?: string
  children?: string[]
  styles?: Record<string, string | number>
  props?: Record<string, unknown>
}

export interface CanvasPage {
  id: string
  name: string
  elements: CanvasElement[]
  background: string
}

export type SelectionState = {
  selectedIds: string[]
  hoveredId: string | null
}
