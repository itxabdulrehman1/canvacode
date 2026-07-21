/**
 * Safely query a DOM element
 */
export function querySelector<T extends Element = Element>(
  selector: string,
  root: Document | Element = document
): T | null {
  return root.querySelector<T>(selector)
}

/**
 * Get element's bounding rect safely
 */
export function getBoundingRect(el: Element | null): DOMRect | null {
  return el?.getBoundingClientRect() ?? null
}

/**
 * Detect if the app is running inside Electron
 */
export function isElectron(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof (window as unknown as Record<string, unknown>)['electron'] !== 'undefined'
  )
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
