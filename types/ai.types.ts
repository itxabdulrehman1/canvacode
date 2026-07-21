export type AIProviderId = 'openrouter' | 'openai' | 'anthropic' | 'gemini' | 'deepseek' | 'groq'
export interface AIProviderSettings { provider: AIProviderId; model: string; hasApiKey: boolean }
export interface AIRequest { promptId: string; prompt: string; context?: Record<string, unknown>; timeoutMs?: number }
export interface AIResponse { id: string; content: string; provider: AIProviderId; model: string; inputTokens: number; outputTokens: number }
