import type { Edge, Node } from '@xyflow/react'
export type BackendBlueprintNodeType = 'route' | 'controller' | 'middleware' | 'auth' | 'validation' | 'service' | 'repository' | 'database' | 'prisma' | 'utility' | 'response' | 'error'
export interface BackendBlueprintData extends Record<string, unknown> { title: string; file: string; code: string; description: string; dependencies: string[]; locked: boolean; modified: boolean; generated: boolean; order: number }
export interface BackendBlueprint { projectId: string; version: number; nodes: Node<BackendBlueprintData, BackendBlueprintNodeType>[]; edges: Edge[]; validation: { errors: string[]; warnings: string[] } }
