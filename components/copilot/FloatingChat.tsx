'use client'

import { useEffect, useRef, useState } from 'react'

interface FloatingChatProps {
  onClose: () => void
}

interface Message {
  id: string
  role: 'copilot' | 'user' | 'action'
  content: string
  actionLabel?: string
  actionFile?: string
}

const initialMessages: Message[] = [
  {
    id: 'initial-copilot',
    role: 'copilot',
    content:
      'Conflict: You added a Phone Input to the UI, but the Auth Node is locked. How should I route this?',
  },
  {
    id: 'initial-user',
    role: 'user',
    content: 'Generate a new parallel verification route.',
  },
  {
    id: 'initial-action',
    role: 'action',
    content: 'Proposed Action',
    actionLabel: 'Review Proposed Diff',
    actionFile: 'parallel_auth.ts',
  },
]

function simulateAgentResponse(userText: string): Promise<string> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const normalizedText = userText.toLowerCase()

      if (
        normalizedText.includes('route') ||
        normalizedText.includes('auth') ||
        normalizedText.includes('verification')
      ) {
        resolve(
          'I mapped that request to the authentication flow. I would create a parallel verification route, preserve the existing locked middleware, and connect the new route to the User schema.',
        )
        return
      }

      if (
        normalizedText.includes('ui') ||
        normalizedText.includes('button') ||
        normalizedText.includes('input') ||
        normalizedText.includes('component')
      ) {
        resolve(
          'I found a UI-focused request. I can update the selected canvas component while keeping its position and inspector properties synchronized with the CanvasCode store.',
        )
        return
      }

      if (
        normalizedText.includes('database') ||
        normalizedText.includes('prisma') ||
        normalizedText.includes('schema')
      ) {
        resolve(
          'I will treat this as a data-model change: inspect the Prisma node, identify affected fields and routes, then surface the generated schema diff for review.',
        )
        return
      }

      resolve(
        `I’m analyzing “${userText}” against the current canvas and backend blueprint. I’ll identify the affected UI elements, nodes, and generated code before proposing a change.`,
      )
    }, 1000)
  })
}

export default function FloatingChat({ onClose }: FloatingChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const [isResponding, setIsResponding] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages, isResponding])

  const handleSend = async () => {
    const userText = input.trim()

    if (!userText || isResponding) return

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: userText,
      },
    ])

    setInput('')
    setIsResponding(true)

    const response = await simulateAgentResponse(userText)

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: crypto.randomUUID(),
        role: 'copilot',
        content: response,
      },
    ])

    setIsResponding(false)
  }

  return (
    <div
      className={`absolute bottom-6 right-6 w-[350px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 ${isMinimized ? 'h-[48px]' : 'h-[500px]'
        }`}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between px-md py-sm border-b border-white/10 bg-zinc-950/40 shrink-0">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-[18px]">
            temp_preferences_custom
          </span>
          <span className="font-headline text-[14px] tracking-wide">
            Agentic Copilot
          </span>
        </div>

        <div className="flex gap-2 text-outline">
          <button
            onClick={() => setIsMinimized((isOpen) => !isOpen)}
            className="hover:text-primary transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isMinimized ? 'expand_less' : 'remove'}
            </span>
          </button>

          <button
            onClick={onClose}
            className="hover:text-primary transition-colors"
            title="Close"
          >
            <span className="material-symbols-outlined text-[16px]">
              close
            </span>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Feed */}
          <div className="flex-1 overflow-y-auto p-md flex flex-col gap-4 font-body-sm text-body-sm scroll-smooth">
            {messages.map((message) => {
              if (message.role === 'copilot') {
                return (
                  <div
                    key={message.id}
                    className="flex flex-col gap-1 max-w-[90%] self-start"
                  >
                    <div className="text-outline font-label-mono text-label-mono text-[10px] uppercase ml-1">
                      Copilot
                    </div>

                    <div className="bg-[#18181b] text-primary p-3 rounded-r-lg rounded-bl-lg border border-white/5 leading-relaxed">
                      {message.content.startsWith('Conflict:') ? (
                        <>
                          <span className="text-error font-medium">
                            Conflict:
                          </span>
                          {message.content.slice('Conflict:'.length)}
                        </>
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                )
              }

              if (message.role === 'user') {
                return (
                  <div
                    key={message.id}
                    className="flex flex-col gap-1 max-w-[85%] self-end"
                  >
                    <div className="text-outline font-label-mono text-label-mono text-[10px] uppercase mr-1 text-right">
                      You
                    </div>

                    <div className="bg-[#27272a] text-primary p-3 rounded-l-lg rounded-br-lg border border-[#3f3f46] leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={message.id}
                  className="flex flex-col gap-1 max-w-[90%] self-start mt-2"
                >
                  <div className="text-outline font-label-mono text-label-mono text-[10px] uppercase ml-1">
                    {message.content}
                  </div>

                  <button
                    onClick={() => window.alert('Diff viewer opened.')}
                    className="group flex items-center justify-between w-full bg-[#18181b] hover:bg-[#27272a] border border-[#3f3f46] hover:border-secondary transition-all duration-200 p-3 rounded-lg text-left hover:shadow-[0_0_15px_rgba(255,185,95,0.15)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/10 p-1.5 rounded text-secondary">
                        <span className="material-symbols-outlined text-[16px]">
                          schema
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-primary font-medium">
                          {message.actionLabel}
                        </span>
                        <span className="text-outline font-label-mono text-[10px]">
                          {message.actionFile}
                        </span>
                      </div>
                    </div>

                    <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors text-[18px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              )
            })}

            {isResponding && (
              <div className="flex flex-col gap-1 max-w-[90%] self-start">
                <div className="text-outline font-label-mono text-label-mono text-[10px] uppercase ml-1">
                  Copilot
                </div>
                <div className="bg-[#18181b] text-on-surface-variant p-3 rounded-r-lg rounded-bl-lg border border-white/5">
                  Analyzing architecture…
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="p-sm bg-zinc-950/60 border-t border-white/10">
            <div className="relative flex items-center bg-[#18181b] border border-[#3f3f46] rounded-lg focus-within:border-secondary focus-within:shadow-[0_0_8px_rgba(255,185,95,0.2)] transition-all">
              <textarea
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    void handleSend()
                  }
                }}
                placeholder="Command the architecture..."
                disabled={isResponding}
                className="w-full bg-transparent border-none text-primary placeholder-outline focus:ring-0 resize-none py-3 pl-3 pr-10 font-body-sm text-body-sm block max-h-[100px] h-[44px] disabled:opacity-50"
              />

              <button
                onClick={() => void handleSend()}
                disabled={isResponding || !input.trim()}
                className="absolute right-2 bottom-2 p-1 text-outline hover:text-primary hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all rounded disabled:opacity-40 disabled:hover:text-outline"
                title="Send"
              >
                <span className="material-symbols-outlined text-[20px]">
                  send
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}