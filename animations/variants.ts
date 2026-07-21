import type { Variants } from 'framer-motion'

// ─── Fade Variants ────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

// ─── Slide Variants ───────────────────────────────────────────────────────────

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 16 },
}

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
}

export const slideInDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

// ─── Scale Variants ───────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const scaleOut: Variants = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 0, scale: 0.95 },
}

// ─── Sidebar Expand ───────────────────────────────────────────────────────────

export const sidebarExpand: Variants = {
  collapsed: { width: 48, transition: { duration: 0.2, ease: 'easeInOut' } },
  expanded: { width: 240, transition: { duration: 0.2, ease: 'easeInOut' } },
}

export const sidebarLabelReveal: Variants = {
  collapsed: { opacity: 0, width: 0, overflow: 'hidden' },
  expanded: { opacity: 1, width: 'auto', overflow: 'visible' },
}

// ─── Modal Variants ───────────────────────────────────────────────────────────

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: -8 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.97, y: -8 },
}

// ─── Page Transition ──────────────────────────────────────────────────────────

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 6 },
}

// ─── Stagger Container ────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

// ─── Hover Variants ───────────────────────────────────────────────────────────

export const hoverLift = {
  whileHover: { y: -2, transition: { duration: 0.15 } },
  whileTap: { scale: 0.98 },
}

export const buttonPress = {
  whileTap: { scale: 0.96 },
}

// ─── Notification Slide In ────────────────────────────────────────────────────

export const notificationSlide: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 40, scale: 0.9 },
}
