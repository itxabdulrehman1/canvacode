'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Keyboard, BookOpen, Compass, Command } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { staggerContainer, staggerItem } from '@/animations/variants'

export default function HelpPage() {
  return (
    <DashboardLayout>
      <motion.div
        className="p-6 flex flex-col gap-6 max-w-4xl mx-auto w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem}>
          <div className="flex flex-col gap-1 mb-2">
            <h1 className="text-xl font-bold text-[#e5e2e1]">Help Center</h1>
            <p className="text-xs text-[#8e9192]">
              Quick shortcuts, guides, and documentation links to master the CanvasCode visual workflow.
            </p>
          </div>
        </motion.div>

        {/* Guides Row */}
        <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex flex-col gap-2 border-[#262525] bg-[#100f0f]">
            <div className="h-9 w-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-xs font-bold text-[#e5e2e1]">User Documentation</h3>
            <p className="text-[10px] text-[#8e9192] leading-relaxed">
              Explore step-by-step guides on linking custom SQLite repositories and running visual full-stack modules.
            </p>
          </Card>

          <Card className="flex flex-col gap-2 border-[#262525] bg-[#100f0f]">
            <div className="h-9 w-9 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Compass className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-xs font-bold text-[#e5e2e1]">Interactive Tutorials</h3>
            <p className="text-[10px] text-[#8e9192] leading-relaxed">
              Follow animated walkthroughs showing how to drag UI nodes and bind endpoints in the blueprint console.
            </p>
          </Card>

          <Card className="flex flex-col gap-2 border-[#262525] bg-[#100f0f]">
            <div className="h-9 w-9 rounded-lg bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Keyboard className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-xs font-bold text-[#e5e2e1]">Keyboard Shortcuts</h3>
            <p className="text-[10px] text-[#8e9192] leading-relaxed">
              Accelerate actions by leveraging custom hotkey triggers for compilation, node creation, and code export.
            </p>
          </Card>
        </motion.div>

        {/* Shortcuts Detail */}
        <motion.div variants={staggerItem}>
          <Card className="border-[#262525] bg-[#100f0f] p-4 flex flex-col gap-3">
            <h3 className="text-xs font-bold text-[#e5e2e1] flex items-center gap-1.5">
              <Command className="h-4 w-4 text-blue-400" />
              <span>Common Commands & Keyboard Hotkeys</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-xs">
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center py-1 border-b border-[#1c1b1b]">
                  <span className="text-[#8e9192]">Open Command Palette</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#1c1b1b] border border-[#2a2929] text-[10px] text-[#e5e2e1]">⌘ K</kbd>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1c1b1b]">
                  <span className="text-[#8e9192]">Create New Project</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#1c1b1b] border border-[#2a2929] text-[10px] text-[#e5e2e1]">⌘ N</kbd>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center py-1 border-b border-[#1c1b1b]">
                  <span className="text-[#8e9192]">Toggle Left Sidebar</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#1c1b1b] border border-[#2a2929] text-[10px] text-[#e5e2e1]">⌘ \</kbd>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1c1b1b]">
                  <span className="text-[#8e9192]">Toggle Copilot Drawer</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#1c1b1b] border border-[#2a2929] text-[10px] text-[#e5e2e1]">⌘ I</kbd>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
