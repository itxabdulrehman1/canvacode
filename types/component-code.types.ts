import type { CanvasNodeType } from './canvas-engine.types'
import type { ComponentCategory } from '../features/components/componentRegistry'

export interface ComponentPropertyDefinition { name: string; type: 'string' | 'boolean' | 'number' | 'enum'; required?: boolean; defaultValue?: unknown; codeAttribute?: string }
export interface ComponentTemplate { componentId: CanvasNodeType; framework: 'react' | 'next' | 'jsx' | 'typescript' | 'shadcn'; exportName: string; imports: string[]; dependencies: string[]; code: string; propertyMapping: Record<string, string> }
export interface ComponentCodeDefinition { id: CanvasNodeType; name: string; category: ComponentCategory; version: string; author: string; description: string; properties: ComponentPropertyDefinition[]; events: string[]; styles: string[]; supportsChildren: boolean; templates: ComponentTemplate[] }
