'use client'

import { motion } from 'framer-motion'
import { GitBranch, ExternalLink, Zap, Code2, Layers, Sparkles } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/common/Logo'
import { staggerContainer, staggerItem } from '@/animations/variants'

const TECH_STACK = [
  { label: 'Next.js 14', color: 'default' as const },
  { label: 'TypeScript', color: 'primary' as const },
  { label: 'Tailwind CSS', color: 'primary' as const },
  { label: 'Framer Motion', color: 'success' as const },
  { label: 'Zustand', color: 'warning' as const },
  { label: 'React Query', color: 'default' as const },
  { label: 'React Flow', color: 'default' as const },
  { label: 'Monaco Editor', color: 'default' as const },
]

const FEATURES = [
  {
    icon: Layers,
    title: 'Visual UI Canvas',
    description: 'Drag-and-drop interface builder with real-time component editing.',
    color: 'text-blue-400',
  },
  {
    icon: Code2,
    title: 'Blueprint Engine',
    description: 'Node-based backend orchestration for APIs, databases, and logic.',
    color: 'text-green-400',
  },
  {
    icon: Sparkles,
    title: 'AI Copilot',
    description: 'Intelligent assistant that generates components and suggests fixes.',
    color: 'text-purple-400',
  },
  {
    icon: Zap,
    title: 'One-click Compile',
    description: 'Instantly compile your visual design to production-ready code.',
    color: 'text-amber-400',
  },
]

export default function AboutPage() {
  return (
    <AppShell>
      <motion.div
        className="flex-1 overflow-y-auto p-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Hero */}
          <motion.div variants={staggerItem} className="text-center flex flex-col items-center gap-4">
            <Logo size="lg" />
            <div>
              <h1 className="text-2xl font-semibold text-[#e5e2e1]">CanvasCode</h1>
              <p className="text-sm text-[#8e9192] mt-1">
                AI-native Visual Full-Stack IDE — v0.1.0 (Milestone 1)
              </p>
            </div>
            <p className="text-sm text-[#c4c7c8] max-w-lg leading-relaxed">
              CanvasCode reimagines full-stack development by merging visual UI design with backend
              logic orchestration into a single, AI-powered workspace.
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<GitBranch className="h-3.5 w-3.5" />}
              >
                GitHub
              </Button>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ExternalLink className="h-3.5 w-3.5" />}
              >
                Documentation
              </Button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div variants={staggerItem}>
            <h2 className="text-sm font-semibold text-[#e5e2e1] mb-3">Core Features</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FEATURES.map((feat) => {
                const Icon = feat.icon
                return (
                  <Card key={feat.title}>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-md bg-[#2a2a2a] flex items-center justify-center shrink-0">
                        <Icon className={`h-4 w-4 ${feat.color}`} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#e5e2e1]">{feat.title}</p>
                        <p className="text-xs text-[#8e9192] mt-0.5">{feat.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 pt-1">
                  {TECH_STACK.map((tech) => (
                    <Badge key={tech.label} variant={tech.color}>
                      {tech.label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Build info */}
          <motion.div variants={staggerItem}>
            <div className="text-center text-xs text-[#444748]">
              <p>Built with Next.js 14 App Router · TypeScript · Tailwind CSS</p>
              <p className="mt-1">Milestone 1 — Frontend Foundation</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AppShell>
  )
}
