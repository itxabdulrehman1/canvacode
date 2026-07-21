'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/uiStore'
import { useAuthStore } from '@/stores/authStore'
import { Logo } from '@/components/common/Logo'
import { sidebarExpand, sidebarLabelReveal } from '@/animations/variants'
import {
  FolderOpen,
  Layers,
  Clock,
  Star,
  HelpCircle,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, href: '/projects' },
  { id: 'templates', label: 'Templates', icon: Layers, href: '/templates' },
  { id: 'recent', label: 'Recent', icon: Clock, href: '/recent' },
  { id: 'favorites', label: 'Favorites', icon: Star, href: '/favorites' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  { id: 'help', label: 'Help', icon: HelpCircle, href: '/help' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isSidebarExpanded, toggleSidebar } = useUIStore()
  const { logoutAction, isLoading: isLoggingOut } = useAuthStore()

  const handleLogout = async () => {
    try {
      const res = await logoutAction()
      if (res.success) {
        router.push('/login')
      }
    } catch (err) {
      console.error('Failed to log out:', err)
    }
  }

  return (
    <motion.nav
      variants={sidebarExpand}
      animate={isSidebarExpanded ? 'expanded' : 'collapsed'}
      initial={false}
      className="relative flex flex-col h-full bg-[#141313] border-r border-[#1c1b1b] shrink-0 overflow-hidden"
      aria-label="Primary navigation"
    >
      {/* Logo area */}
      <div className="flex items-center h-12 px-3 border-b border-[#1c1b1b] shrink-0">
        <AnimatePresence initial={false}>
          {isSidebarExpanded ? (
            <motion.div
              key="logo-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Logo size="sm" />
            </motion.div>
          ) : (
            <motion.div
              key="logo-collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center"
            >
              <span className="text-[10px] font-bold text-white">CC</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname?.startsWith(item.href)

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 h-9 px-2.5 rounded-md transition-colors duration-150',
                'group relative',
                isActive
                  ? 'bg-blue-600/15 text-blue-400'
                  : 'text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#201f1f]'
              )}
              aria-current={isActive ? 'page' : undefined}
              title={!isSidebarExpanded ? item.label : undefined}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-blue-500" />
              )}
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <motion.span
                variants={sidebarLabelReveal}
                animate={isSidebarExpanded ? 'expanded' : 'collapsed'}
                initial={false}
                className="text-sm font-medium whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            </Link>
          )
        })}
      </div>

      {/* Logout button */}
      <div className="p-2 border-t border-[#1c1b1b] shrink-0">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={cn(
            'flex items-center gap-2.5 h-9 w-full px-2.5 rounded-md text-[#8e9192] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors duration-150 focus:outline-none disabled:opacity-50'
          )}
          title={!isSidebarExpanded ? 'Log Out' : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          <motion.span
            variants={sidebarLabelReveal}
            animate={isSidebarExpanded ? 'expanded' : 'collapsed'}
            initial={false}
            className="text-sm font-medium whitespace-nowrap"
          >
            Log Out
          </motion.span>
        </button>
      </div>

      {/* Toggle button */}
      <div className="p-2 border-t border-[#1c1b1b] shrink-0">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center h-9 w-full rounded-md text-[#8e9192] hover:text-[#e5e2e1] hover:bg-[#201f1f] transition-colors"
          aria-label={isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isSidebarExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
    </motion.nav>
  )
}
