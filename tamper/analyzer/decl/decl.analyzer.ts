import { FunctionDeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.function'
import { VariableDeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.variable'
import { AstAnalyzer, AstFlag } from '@/tamper/api/api.analyzer'
import { WrappedStatement } from '@/tamper/api/api.statement'
import type { Declaration } from '@swc/core'

export class DeclarationAnalyzer extends AstAnalyzer<Declaration> {
	public fnDeclAnalyzer = new FunctionDeclarationAnalyzer()
	public varDeclAnalyzer = new VariableDeclarationAnalyzer()

	public override analyze(
		declaration: Declaration
	): WrappedStatement<Declaration> {
		switch (declaration.type) {
			case 'FunctionDeclaration':
				return this.fnDeclAnalyzer.analyze(declaration)
			case 'VariableDeclaration':
				return this.varDeclAnalyzer.analyze(declaration)
			default:
				return new WrappedStatement(declaration, AstFlag.Readonly)
		}
	}
}
