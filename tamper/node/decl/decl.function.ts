import type { FunctionDeclaration } from '@swc/core'

export class FunctionAnalyzer {
	private readonly checkedToTransform: FunctionDeclaration[] = []

	private analyzeFnDecl(statement: FunctionDeclaration) {
		if (
			!statement.async &&
			statement.body?.stmts &&
			statement.body?.stmts.length > 0
		) {
			this.checkedToTransform.push(statement)
		}
	}

	public analyze(statement: FunctionDeclaration) {
		this.analyzeFnDecl(statement)
	}

	public get toTransform() {
		return this.checkedToTransform
	}
}
