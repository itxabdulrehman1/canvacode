import { create } from 'zustand'

export interface MockProject {
  id: string
  name: string
  description: string
  framework: 'Next.js' | 'React' | 'Vue' | 'Electron' | 'Svelte'
  template: string
  createdAt: string
  lastOpened: string
  lastModified: string
  version: string
  status: 'active' | 'archived' | 'stable' | 'building'
  isFavorite: boolean
  isPinned: boolean
  path: string
}

interface ProjectState {
  projects: MockProject[]
  activeProjectId: string | null
  isLoading: boolean

  setActiveProjectId: (id: string | null) => void
  createProject: (name: string, description: string, framework: 'Next.js' | 'React' | 'Vue' | 'Electron' | 'Svelte', template: string) => void
  renameProject: (id: string, newName: string) => void
  duplicateProject: (id: string) => void
  deleteProject: (id: string) => void
  toggleFavorite: (id: string) => void
  togglePinned: (id: string) => void
}

const INITIAL_PROJECTS: MockProject[] = [
  {
    id: 'proj-1',
    name: 'Hospital Management System',
    description: 'A comprehensive medical clinic dashboard for managing patients, doctor timetables, appointments, and billing receipts.',
    framework: 'Next.js',
    template: 'Admin Dashboard',
    createdAt: '2026-06-15T10:00:00Z',
    lastOpened: '2026-07-19T14:30:00Z',
    lastModified: '2026-07-19T14:25:00Z',
    version: '1.2.4',
    status: 'active',
    isFavorite: true,
    isPinned: true,
    path: 'C:/Users/Developer/Projects/hospital-mgmt',
  },
  {
    id: 'proj-2',
    name: 'Inventory Management Console',
    description: 'Real-time barcode inventory monitor tracking warehouse stocks, supplier deliveries, and low stock warnings.',
    framework: 'Electron',
    template: 'Admin Dashboard',
    createdAt: '2026-05-10T08:00:00Z',
    lastOpened: '2026-07-18T16:00:00Z',
    lastModified: '2026-07-18T15:45:00Z',
    version: '0.9.1',
    status: 'building',
    isFavorite: true,
    isPinned: true,
    path: 'C:/Users/Developer/Projects/inventory-console',
  },
  {
    id: 'proj-3',
    name: 'Student Portal Web App',
    description: 'Educational classroom portal where teachers upload worksheets and students review syllabus reports.',
    framework: 'React',
    template: 'SaaS App',
    createdAt: '2026-04-12T11:20:00Z',
    lastOpened: '2026-07-15T09:15:00Z',
    lastModified: '2026-07-15T09:00:00Z',
    version: '1.0.0',
    status: 'stable',
    isFavorite: false,
    isPinned: false,
    path: 'C:/Users/Developer/Projects/student-portal',
  },
  {
    id: 'proj-4',
    name: 'CRM Customer Dashboard',
    description: 'Sales team CRM panel featuring target tracking pipelines, visual charts, and customer profile logging lists.',
    framework: 'Next.js',
    template: 'CRM Dashboard',
    createdAt: '2026-06-20T14:00:00Z',
    lastOpened: '2026-07-19T12:00:00Z',
    lastModified: '2026-07-19T11:50:00Z',
    version: '2.1.0',
    status: 'active',
    isFavorite: true,
    isPinned: false,
    path: 'C:/Users/Developer/Projects/crm-dashboard',
  },
  {
    id: 'proj-5',
    name: 'E-Commerce Storefront',
    description: 'High-performance visual shopping storefront with digital cart counters and custom payment screens.',
    framework: 'Vue',
    template: 'E-Commerce Store',
    createdAt: '2026-03-01T09:00:00Z',
    lastOpened: '2026-07-02T18:00:00Z',
    lastModified: '2026-07-02T17:30:00Z',
    version: '1.5.8',
    status: 'stable',
    isFavorite: false,
    isPinned: false,
    path: 'C:/Users/Developer/Projects/ecommerce-store',
  },
  {
    id: 'proj-6',
    name: 'Task Flow Manager',
    description: 'Visual task manager tool supporting kanban columns, custom labels, and priority calendar tracking grid.',
    framework: 'Svelte',
    template: 'SaaS App',
    createdAt: '2026-07-01T15:00:00Z',
    lastOpened: '2026-07-19T16:40:00Z',
    lastModified: '2026-07-19T16:30:00Z',
    version: '0.4.0',
    status: 'building',
    isFavorite: false,
    isPinned: false,
    path: 'C:/Users/Developer/Projects/task-flow',
  },
  {
    id: 'proj-7',
    name: 'Predictive Analytics Engine',
    description: 'Developer workspace plotting visual regression models, statistical datasets, and forecasting timelines.',
    framework: 'React',
    template: 'Admin Dashboard',
    createdAt: '2026-01-10T13:40:00Z',
    lastOpened: '2026-06-25T11:00:00Z',
    lastModified: '2026-06-25T10:45:00Z',
    version: '3.0.1',
    status: 'stable',
    isFavorite: true,
    isPinned: false,
    path: 'C:/Users/Developer/Projects/analytics-engine',
  },
  {
    id: 'proj-8',
    name: 'Developer Portfolio Template',
    description: 'Elegant personal portfolio showing design credentials, visual case studies, and email contact forms.',
    framework: 'Next.js',
    template: 'Portfolio Website',
    createdAt: '2026-07-10T08:30:00Z',
    lastOpened: '2026-07-19T17:15:00Z',
    lastModified: '2026-07-19T17:10:00Z',
    version: '1.0.1',
    status: 'active',
    isFavorite: false,
    isPinned: false,
    path: 'C:/Users/Developer/Projects/portfolio-web',
  },
]

export const useProjectStore = create<ProjectState>((set) => ({
  projects: INITIAL_PROJECTS,
  activeProjectId: null,
  isLoading: false,

  setActiveProjectId: (id) => set({ activeProjectId: id }),

  createProject: (name, description, framework, template) => {
    set({ isLoading: true })
    const newProject: MockProject = {
      id: `proj-${Date.now()}`,
      name,
      description: description || 'No project description provided.',
      framework,
      template,
      createdAt: new Date().toISOString(),
      lastOpened: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: '0.1.0',
      status: 'active',
      isFavorite: false,
      isPinned: false,
      path: `C:/Users/Developer/Projects/${name.toLowerCase().replace(/\s+/g, '-')}`,
    }

    setTimeout(() => {
      set((state) => ({
        projects: [newProject, ...state.projects],
        isLoading: false,
      }))
    }, 800) // Simulated creation delay
  },

  renameProject: (id, newName) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id
          ? {
              ...p,
              name: newName,
              lastModified: new Date().toISOString(),
            }
          : p
      ),
    }))
  },

  duplicateProject: (id) => {
    set({ isLoading: true })
    setTimeout(() => {
      set((state) => {
        const source = state.projects.find((p) => p.id === id)
        if (!source) return { isLoading: false }

        const clone: MockProject = {
          ...source,
          id: `proj-${Date.now()}`,
          name: `${source.name} Copy`,
          createdAt: new Date().toISOString(),
          lastOpened: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          isPinned: false,
          isFavorite: false,
        }

        return {
          projects: [clone, ...state.projects],
          isLoading: false,
        }
      })
    }, 700)
  },

  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      activeProjectId: state.activeProjectId === id ? null : state.activeProjectId,
    }))
  },

  toggleFavorite: (id) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ),
    }))
  },

  togglePinned: (id) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, isPinned: !p.isPinned } : p
      ),
    }))
  },
}))
