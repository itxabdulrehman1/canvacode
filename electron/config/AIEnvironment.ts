import * as fs from 'fs'
import * as path from 'path'

/** Reads a local OpenRouter key only in the Electron main process. */
export function getOpenRouterApiKey(): string | undefined {
  const direct = process.env.OPENROUTER_API_KEY?.trim()
  if (direct) return direct
  const envFile = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envFile)) return undefined
  const match = fs.readFileSync(envFile, 'utf8').match(/^OPENROUTER_API_KEY\s*=\s*(.+)$/m)
  return match?.[1].trim().replace(/^['"]|['"]$/g, '') || undefined
}
