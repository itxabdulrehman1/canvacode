import type { Transition } from 'framer-motion'

// ─── Easing Curves ────────────────────────────────────────────────────────────

export const ease = {
  in: [0.4, 0, 1, 1] as [number, number, number, number],
  out: [0, 0, 0.2, 1] as [number, number, number, number],
  inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  sharp: [0.4, 0, 0.6, 1] as [number, number, number, number],
  spring: { type: 'spring', stiffness: 400, damping: 30 },
}

// ─── Standard Transitions ─────────────────────────────────────────────────────

export const transitionFast: Transition = {
  duration: 0.15,
  ease: ease.out,
}

export const transitionDefault: Transition = {
  duration: 0.2,
  ease: ease.inOut,
}

export const transitionSlow: Transition = {
  duration: 0.3,
  ease: ease.inOut,
}

export const transitionSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 35,
}

export const transitionBounce: Transition = {
  type: 'spring',
  stiffness: 600,
  damping: 25,
}

export const transitionPage: Transition = {
  duration: 0.25,
  ease: ease.inOut,
}

export const transitionModal: Transition = {
  duration: 0.2,
  ease: ease.out,
}

export const transitionSidebar: Transition = {
  duration: 0.2,
  ease: ease.inOut,
}
