import { Analyzer } from '@/tamper/analyzer'
import { AstAnalyzer } from '@/tamper/api/api.analyzer'
import type { FunctionDeclaration } from '@swc/core'

export class FunctionDeclarationAnalyzer extends AstAnalyzer<FunctionDeclaration> {
	private analyzeFnDecl(statement: FunctionDeclaration) {
		if (
			!statement.async &&
			statement.body?.stmts &&
			statement.body?.stmts.length > 0
		) {
			this.marked.push(statement)
			const parentAnalyzer = this.getInstance<Analyzer>(Analyzer.name)
			parentAnalyzer.analyzeStatements(statement.body.stmts)
		}
	}

	public override analyze(statement: FunctionDeclaration) {
		this.analyzeFnDecl(statement)
	}
}
