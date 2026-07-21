import type { ProjectAST } from '../../types/ast.types'
export class ASTSerializer { serialize(ast: ProjectAST) { return JSON.stringify(ast) }; deserialize(value: string) { return JSON.parse(value) as ProjectAST } }
