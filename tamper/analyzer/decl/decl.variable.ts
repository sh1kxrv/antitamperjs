import { DeclaratorAnalyzer } from '@/tamper/analyzer/decl/declarator/declarator.analyzer'
import { AstAnalyzer, AstFlag } from '@/tamper/api/api.analyzer'
import { WrappedStatement } from '@/tamper/api/api.statement'
import type { VariableDeclaration, VariableDeclarator } from '@swc/core'

export class WrappedVariableDeclaration extends WrappedStatement<VariableDeclaration> {
	private readonly declaratorAnalyzer = new DeclaratorAnalyzer()
	declarators: WrappedStatement<VariableDeclarator>[] = []

	constructor(statement: VariableDeclaration, flag: AstFlag) {
		super(statement, flag)
		for (const declarator of statement.declarations) {
			const analyzed = this.declaratorAnalyzer.analyze(declarator)
			this.declarators.push(analyzed)
		}
	}
}

export class VariableDeclarationAnalyzer extends AstAnalyzer<VariableDeclaration> {
	public analyze(declaration: VariableDeclaration): WrappedVariableDeclaration {
		return new WrappedVariableDeclaration(declaration, AstFlag.Modifiable)
	}
}
