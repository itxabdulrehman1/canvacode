import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes safely, resolving conflicts intelligently.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
