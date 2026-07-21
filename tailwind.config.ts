import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Core surfaces ──────────────────────────────
        background:                '#141313',
        surface:                   '#141313',
        'surface-dim':             '#141313',
        'surface-bright':          '#3a3939',
        'surface-variant':         '#353434',
        'surface-tint':            '#c6c6c7',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low':   '#1c1b1b',
        'surface-container':       '#201f1f',
        'surface-container-high':  '#2a2a2a',
        'surface-container-highest': '#353434',

        // ── Primary (white/neutral) ─────────────────────
        primary:                   '#ffffff',
        'on-primary':              '#2f3131',
        'primary-fixed':           '#e2e2e2',
        'primary-fixed-dim':       '#c6c6c7',
        'primary-container':       '#e2e2e2',
        'on-primary-fixed':        '#1a1c1c',
        'on-primary-fixed-variant': '#454747',
        'on-primary-container':    '#636565',
        'inverse-primary':         '#5d5f5f',

        // ── Blue accent (IDE accent color) ──────────────
        accent:                    '#3b82f6',
        'accent-hover':            '#2563eb',
        'accent-dim':              '#1d4ed8',
        'accent-muted':            'rgba(59,130,246,0.15)',
        'accent-border':           'rgba(59,130,246,0.25)',

        // ── On-surface ─────────────────────────────────
        'on-surface':              '#e5e2e1',
        'on-surface-variant':      '#c4c7c8',
        'on-background':           '#e5e2e1',
        'inverse-surface':         '#e5e2e1',
        'inverse-on-surface':      '#313030',

        // ── Outline ────────────────────────────────────
        outline:                   '#8e9192',
        'outline-variant':         '#444748',

        // ── Error / Status ─────────────────────────────
        error:                     '#ffb4ab',
        'on-error':                '#690005',
        'error-container':         '#93000a',
        'on-error-container':      '#ffdad6',
      },

      borderRadius: {
        DEFAULT: '0.25rem',
        sm:      '0.125rem',
        md:      '0.375rem',
        lg:      '0.5rem',
        xl:      '0.75rem',
        '2xl':   '1rem',
        full:    '9999px',
      },

      spacing: {
        xs:             '4px',
        unit:           '4px',
        sm:             '8px',
        md:             '16px',
        lg:             '24px',
        xl:             '48px',
        'editor-padding': '20px',
        'panel-gutter':   '1px',
      },

      fontFamily: {
        sans:       ['Geist', 'system-ui', 'sans-serif'],
        display:    ['Geist', 'sans-serif'],
        headline:   ['Geist', 'sans-serif'],
        'body-lg':  ['Geist', 'sans-serif'],
        'body-sm':  ['Geist', 'sans-serif'],
        mono:       ['JetBrains Mono', 'Menlo', 'monospace'],
        code:       ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        display:    ['24px', { lineHeight: '32px',  letterSpacing: '-0.02em', fontWeight: '600' }],
        headline:   ['18px', { lineHeight: '24px',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg':  ['14px', { lineHeight: '22px',  fontWeight: '400' }],
        'body-sm':  ['13px', { lineHeight: '20px',  fontWeight: '400' }],
        'label-caps': ['11px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-mono': ['11px', { lineHeight: '14px', fontWeight: '500' }],
        code:       ['13px', { lineHeight: '20px',  fontWeight: '400' }],
      },

      boxShadow: {
        'panel':   '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.24)',
        'floating': '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)',
        'modal':   '0 24px 64px rgba(0,0,0,0.7)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.25)',
        'glow-white': '0 0 15px rgba(255,255,255,0.15)',
      },

      transitionDuration: {
        '0':   '0ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },

      transitionTimingFunction: {
        'in':     'cubic-bezier(0.4, 0, 1, 1)',
        'out':    'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
