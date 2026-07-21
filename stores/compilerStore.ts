import { create } from 'zustand'

type CompilerStatus = 'idle' | 'compiling' | 'success' | 'error'

interface CompilerState {
  status: CompilerStatus
  progress: number
  logs: string[]
  errorMessage: string | null
  lastCompiledAt: string | null

  setStatus: (status: CompilerStatus) => void
  setProgress: (progress: number) => void
  appendLog: (log: string) => void
  clearLogs: () => void
  setError: (message: string | null) => void
  setLastCompiledAt: (timestamp: string) => void
}

export const useCompilerStore = create<CompilerState>((set) => ({
  status: 'idle',
  progress: 0,
  logs: [],
  errorMessage: null,
  lastCompiledAt: null,

  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  appendLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
  clearLogs: () => set({ logs: [] }),
  setError: (message) => set({ errorMessage: message }),
  setLastCompiledAt: (timestamp) => set({ lastCompiledAt: timestamp }),
}))
