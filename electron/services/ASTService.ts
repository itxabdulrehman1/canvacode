import { ASTBuilder } from '../../features/ast/ASTBuilder'
import { ASTValidator } from '../../features/ast/ASTValidator'
import { ASTSerializer } from '../../features/ast/ASTSerializer'
import { ASTRepository } from '../repositories/ASTRepository'
import type { CanvasDocument } from '../../types/canvas-engine.types'
export class ASTService { private builder = new ASTBuilder(); private validator = new ASTValidator(); private serializer = new ASTSerializer(); private repository = new ASTRepository(); generate(projectId: string, document: CanvasDocument) { if (!projectId || !document) throw new Error('Invalid AST generation request'); const ast = this.builder.build(projectId, document); const validation = this.validator.validate(ast); this.repository.save(projectId, ast, validation); return { ast, validation } }; load(projectId: string) { return this.repository.load(projectId) }; validate(projectId: string, document: CanvasDocument) { return this.validator.validate(this.builder.build(projectId, document)) }; serialize(projectId: string) { const data = this.repository.load(projectId); return data ? this.serializer.serialize(data.ast) : null } }
