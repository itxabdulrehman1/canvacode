import { create } from 'zustand'
import type { ASTValidationResult, ProjectAST } from '@/types/ast.types'
export const useASTStore = create<{ ast: ProjectAST | null; validation: ASTValidationResult | null; set: (ast: ProjectAST, validation: ASTValidationResult) => void }>((set) => ({ ast: null, validation: null, set: (ast, validation) => set({ ast, validation }) }))
