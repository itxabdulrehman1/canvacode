'use client'

interface CodePeekProps {
  isOpen: boolean
  onToggle: () => void
}

// Syntax-highlighted code lines extracted verbatim from the Stitch HTML
const codeLines = [
  { parts: [{ cls: 'text-[#c4c7c8]', text: '// Endpoint: POST /api/auth/login' }] },
  { parts: [
    { cls: 'text-secondary', text: 'export const' },
    { cls: 'text-primary',   text: ' loginHandler' },
    { cls: 'text-secondary', text: ' = ' },
    { cls: 'text-secondary', text: 'async' },
    { cls: 'text-primary',   text: ' (' },
    { cls: 'text-[#a3defe]', text: 'req' },
    { cls: 'text-primary',   text: ': ' },
    { cls: 'text-[#ffb4ab]', text: 'Request' },
    { cls: 'text-primary',   text: ', ' },
    { cls: 'text-[#a3defe]', text: 'res' },
    { cls: 'text-primary',   text: ': ' },
    { cls: 'text-[#ffb4ab]', text: 'Response' },
    { cls: 'text-primary',   text: ') => {' },
  ]},
  { parts: [{ cls: 'text-secondary', text: '  try {' }] },
  { parts: [
    { cls: 'text-secondary', text: '    const' },
    { cls: 'text-primary',   text: ' { ' },
    { cls: 'text-primary',   text: 'email' },
    { cls: 'text-primary',   text: ', ' },
    { cls: 'text-primary',   text: 'password' },
    { cls: 'text-primary',   text: ' } = ' },
    { cls: 'text-[#a3defe]', text: 'req' },
    { cls: 'text-primary',   text: '.body;' },
  ]},
  { parts: [] },
  { parts: [{ cls: 'text-[#c4c7c8]', text: '    // 1. Validate Input Structure' }] },
  { parts: [
    { cls: 'text-secondary', text: '    if' },
    { cls: 'text-primary',   text: ' (!' },
    { cls: 'text-primary',   text: 'email' },
    { cls: 'text-primary',   text: ' || !' },
    { cls: 'text-primary',   text: 'password' },
    { cls: 'text-primary',   text: ') {' },
  ]},
  { parts: [
    { cls: 'text-secondary', text: '      return' },
    { cls: 'text-[#a3defe]', text: ' res' },
    { cls: 'text-primary',   text: '.status(' },
    { cls: 'text-[#ee9800]', text: '400' },
    { cls: 'text-primary',   text: ').json({ ' },
    { cls: 'text-primary',   text: 'error' },
    { cls: 'text-primary',   text: ': ' },
    { cls: 'text-[#93000a]', text: "'Missing required fields'" },
    { cls: 'text-primary',   text: ' });' },
  ]},
  { parts: [{ cls: 'text-primary', text: '    }' }] },
  { parts: [] },
  { parts: [{ cls: 'text-[#c4c7c8]', text: '    // 2. Check Database for User' }] },
  { parts: [
    { cls: 'text-secondary', text: '    const' },
    { cls: 'text-primary',   text: ' user' },
    { cls: 'text-secondary', text: ' = ' },
    { cls: 'text-secondary', text: 'await' },
    { cls: 'text-primary',   text: ' prisma.user.findUnique({' },
  ]},
  { parts: [{ cls: 'text-primary', text: '      where: { email }' }] },
  { parts: [{ cls: 'text-primary', text: '    });' }] },
  { parts: [] },
  { parts: [{ cls: 'text-[#c4c7c8]', text: '    // 3. Verify Password Hash' }] },
  { parts: [
    { cls: 'text-secondary', text: '    const' },
    { cls: 'text-primary',   text: ' isValid' },
    { cls: 'text-secondary', text: ' = ' },
    { cls: 'text-secondary', text: 'await' },
    { cls: 'text-primary',   text: ' bcrypt.compare(password, user.hashed_password);' },
  ]},
  { parts: [{ cls: 'text-[#c4c7c8]', text: '    // ... proceed to issue JWT token (See next node)' }] },
  { parts: [{ cls: 'text-secondary', text: '  } catch' },{ cls: 'text-primary', text: ' (error) {' }] },
  { parts: [{ cls: 'text-primary',   text: "    logger.error('Login Error:', error);" }] },
  { parts: [
    { cls: 'text-secondary', text: '    return' },
    { cls: 'text-[#a3defe]', text: ' res' },
    { cls: 'text-primary',   text: '.status(' },
    { cls: 'text-[#ee9800]', text: '500' },
    { cls: 'text-primary',   text: ").json({ error: " },
    { cls: 'text-[#93000a]', text: "'Internal Server Error'" },
    { cls: 'text-primary',   text: ' });' },
  ]},
  { parts: [{ cls: 'text-primary', text: '  }' }] },
  { parts: [{ cls: 'text-primary', text: '};' }] },
]

export default function CodePeek({ isOpen, onToggle }: CodePeekProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-outline-variant z-40 flex flex-col transform transition-transform duration-300 ${
        isOpen ? 'h-72' : 'h-10'
      }`}
    >
      {/* Drawer handle / header */}
      <div
        onClick={onToggle}
        className="h-10 bg-surface/50 border-b border-outline-variant flex items-center justify-between px-md cursor-pointer hover:bg-surface/80 transition-colors shrink-0"
      >
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-on-surface-variant text-[16px]">code</span>
          <span className="font-label-mono text-label-mono text-primary">login.controller.ts</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] ml-sm border border-outline-variant/50">
            Read-only
          </span>
        </div>
        <div className="flex items-center gap-xs">
          <button
            onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText('') }}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
            title="Copy code"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggle() }}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
            title="Toggle drawer"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isOpen ? 'expand_more' : 'expand_less'}
            </span>
          </button>
        </div>
      </div>

      {/* Code content */}
      {isOpen && (
        <div className="flex-1 overflow-auto p-editor-padding font-code text-code leading-relaxed">
          <pre className="m-0">
            <code>
              {codeLines.map((line, li) => (
                <div key={li} className="leading-6">
                  {line.parts.length === 0 ? (
                    <span>&nbsp;</span>
                  ) : (
                    line.parts.map((part, pi) => (
                      <span key={pi} className={part.cls}>{part.text}</span>
                    ))
                  )}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}
