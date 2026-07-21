import { componentRegistry } from './componentRegistry'
import type { ComponentCodeDefinition, ComponentTemplate } from '../../types/component-code.types'

const sharedProperties = [{ name: 'className', type: 'string' as const, codeAttribute: 'className' }]
const templates = (id: ComponentCodeDefinition['id'], name: string, properties: Record<string, unknown>, children = false): ComponentTemplate[] => {
  const exportName = name.replace(/[^a-zA-Z0-9]/g, '') || 'Component'
  const content = children ? '{children}' : String(properties.text ?? properties.label ?? name)
  const code = `<${exportName} ${Object.entries(properties).filter(([key]) => !['text', 'label'].includes(key)).map(([key, value]) => `${key}={${JSON.stringify(value)}}`).join(' ')}>${content}</${exportName}>`
  return ['react', 'next', 'jsx', 'typescript', 'shadcn'].map((framework) => ({ componentId: id, framework: framework as ComponentTemplate['framework'], exportName, imports: [`@/components/ui/${id}`], dependencies: ['react'], code, propertyMapping: Object.fromEntries(Object.keys(properties).map((key) => [key, key === 'text' || key === 'label' ? 'children' : key])) }))
}
export const componentTemplateRegistry: ComponentCodeDefinition[] = componentRegistry.map((component) => ({ id: component.id, name: component.name, category: component.category, version: '1.0.0', author: 'CanvasCode', description: component.description, properties: [...sharedProperties, ...Object.entries(component.defaultProperties).map(([name, defaultValue]) => ({ name, type: typeof defaultValue === 'boolean' ? 'boolean' as const : typeof defaultValue === 'number' ? 'number' as const : 'string' as const, defaultValue }))], events: ['onClick'], styles: ['background', 'border', 'borderRadius', 'padding', 'margin', 'shadow', 'opacity'], supportsChildren: component.container, templates: templates(component.id, component.name, component.defaultProperties, component.container) }))
export const getComponentCodeDefinition = (id: string) => componentTemplateRegistry.find((component) => component.id === id)
