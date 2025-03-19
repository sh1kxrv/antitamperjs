import { AstAnalyzer } from '@/tamper/api/api.analyzer'
import type { FunctionDeclaration } from '@swc/core'

export class FunctionDeclarationAnalyzer extends AstAnalyzer<FunctionDeclaration> {
	constructor() {
		super(FunctionDeclarationAnalyzer.name)
	}

	private analyzeFnDecl(statement: FunctionDeclaration) {
		if (
			!statement.async &&
			statement.body?.stmts &&
			statement.body?.stmts.length > 0
		) {
			this.marked.push(statement)
		}
	}

	public override analyze(statement: FunctionDeclaration) {
		this.analyzeFnDecl(statement)
	}
}
