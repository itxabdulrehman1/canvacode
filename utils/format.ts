/**
 * Format a date to a relative time string (e.g. "2h ago")
 */
export function formatRelativeTime(dateOrString: Date | string): string {
  const date = typeof dateOrString === 'string' ? new Date(dateOrString) : dateOrString
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return `${Math.floor(diff / 604800)}w ago`
}

/**
 * Truncate a string to a given length with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 1) + '…'
}

/**
 * Convert a string to a kebab-case ID
 */
export function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
