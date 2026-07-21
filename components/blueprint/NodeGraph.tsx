'use client'

import { useState } from 'react'
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import CodePeek from './CodePeek'

type BlueprintNodeData = {
  title?: string
  endpoint?: string
  payload?: string
  filename?: string
  fields?: Array<{ field: string; type: string }>
}

type BlueprintNode = Node<BlueprintNodeData>

function TriggerNode({ data }: NodeProps<BlueprintNode>) {
  return (
    <div className="w-[250px] bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col shadow-lg hover:border-secondary hover:shadow-[0_0_15px_rgba(255,185,95,0.2)] transition-all duration-200">
      <div className="px-md py-sm border-b border-zinc-800 bg-zinc-900 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
          <span className="font-label-caps text-label-caps text-on-surface tracking-wider">
            Trigger Event
          </span>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
          bolt
        </span>
      </div>

      <div className="p-md flex flex-col gap-sm">
        <div className="font-code text-code text-primary bg-black px-sm py-xs rounded border border-zinc-800">
          <span className="text-secondary font-bold">POST</span> {data.endpoint}
        </div>
        <div className="font-label-mono text-label-mono text-on-surface-variant mt-sm flex items-center gap-xs">
          <span className="material-symbols-outlined text-[14px]">
            arrow_forward
          </span>
          Payload: {data.payload}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-secondary !border-2 !border-zinc-950 !shadow-[0_0_8px_rgba(255,185,95,0.8)]"
      />
    </div>
  )
}

function MiddlewareNode({ data }: NodeProps<BlueprintNode>) {
  return (
    <div className="w-[280px] bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col shadow-lg hover:border-secondary hover:shadow-[0_0_15px_rgba(255,185,95,0.2)] transition-all duration-200">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-zinc-800"
      />

      <div className="px-md py-sm border-b border-zinc-800 bg-zinc-900 flex items-center justify-between rounded-t-lg">
        <span className="font-label-caps text-label-caps text-on-surface tracking-wider">
          Middleware
        </span>
        <button className="nodrag w-6 h-6 rounded bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-primary transition-colors">
          <span className="material-symbols-outlined text-[14px]">lock</span>
        </button>
      </div>

      <div className="p-md flex flex-col gap-sm">
        <div className="font-body-sm text-body-sm text-primary font-medium">
          {data.title}
        </div>
        <div className="font-label-mono text-label-mono text-on-surface-variant px-sm py-xs bg-black rounded border border-zinc-800">
          {data.filename}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-secondary !border-2 !border-zinc-950 !shadow-[0_0_8px_rgba(255,185,95,0.8)]"
      />
    </div>
  )
}

function PrismaNode({ data }: NodeProps<BlueprintNode>) {
  return (
    <div className="w-[300px] bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col shadow-lg hover:border-secondary hover:shadow-[0_0_15px_rgba(255,185,95,0.2)] transition-all duration-200">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-zinc-800"
      />

      <div className="px-md py-sm border-b border-zinc-800 bg-zinc-900 flex items-center gap-sm rounded-t-lg">
        <span className="material-symbols-outlined text-secondary text-[18px]">
          database
        </span>
        <span className="font-label-caps text-label-caps text-on-surface tracking-wider">
          Prisma: User Table
        </span>
      </div>

      <div className="p-0 flex flex-col font-code text-code bg-black rounded-b-lg">
        {data.fields?.map(({ field, type }, index) => (
          <div
            key={field}
            className={`flex items-center justify-between px-md py-sm hover:bg-zinc-900 transition-colors cursor-default ${index < (data.fields?.length ?? 0) - 1
                ? 'border-b border-zinc-800'
                : ''
              }`}
          >
            <span className="text-primary">{field}</span>
            <span className="text-on-surface-variant text-[11px] bg-zinc-900 px-2 py-0.5 rounded">
              {type}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const nodeTypes = {
  trigger: TriggerNode,
  middleware: MiddlewareNode,
  prisma: PrismaNode,
}

const initialNodes: BlueprintNode[] = [
  {
    id: 'trigger',
    type: 'trigger',
    position: { x: 100, y: 140 },
    data: {
      endpoint: '/api/auth/login',
      payload: '{email, password}',
    },
  },
  {
    id: 'middleware',
    type: 'middleware',
    position: { x: 460, y: 300 },
    data: {
      title: 'Validate Session JWT',
      filename: 'auth.middleware.ts',
    },
  },
  {
    id: 'prisma',
    type: 'prisma',
    position: { x: 850, y: 140 },
    data: {
      fields: [
        { field: 'id', type: '@id UUID' },
        { field: 'email', type: '@unique String' },
        { field: 'hashed_password', type: 'String' },
      ],
    },
  },
]

const initialEdges: Edge[] = [
  {
    id: 'trigger-to-middleware',
    source: 'trigger',
    target: 'middleware',
    animated: true,
    style: {
      stroke: '#ffb95f',
      strokeWidth: 2,
    },
  },
  {
    id: 'middleware-to-prisma',
    source: 'middleware',
    target: 'prisma',
    animated: true,
    style: {
      stroke: '#ffb95f',
      strokeWidth: 2,
    },
  },
]

export default function NodeGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [codePeekOpen, setCodePeekOpen] = useState(true)

  return (
    <div className="relative flex flex-col h-full w-full bg-background dot-grid overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        minZoom={0.35}
        maxZoom={1.75}
        defaultEdgeOptions={{
          animated: true,
          style: {
            stroke: '#ffb95f',
            strokeWidth: 2,
          },
        }}
      >
        <Background color="#444748" gap={16} size={1} />
        <Controls
          className="!bg-zinc-950 !border-zinc-800 !shadow-xl [&>button]:!bg-zinc-950 [&>button]:!border-zinc-800 [&>button]:!fill-white [&>button:hover]:!bg-zinc-800"
        />
      </ReactFlow>

      <CodePeek
        isOpen={codePeekOpen}
        onToggle={() => setCodePeekOpen((isOpen) => !isOpen)}
      />
    </div>
  )
}