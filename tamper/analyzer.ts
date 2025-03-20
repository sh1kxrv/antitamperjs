import { DeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.analyzer'
import { StatementAnalyzer } from '@/tamper/analyzer/stmt/stmt.analyzer'
import { AstFlag } from '@/tamper/api/api.analyzer'
import { WrappedStatement } from '@/tamper/api/api.statement'
import type { ModuleItem, Node, Program, Statement } from '@swc/core'

export class Analyzer {
	constructor(private readonly program: Program) {}

	private declarationAnalyzer = new DeclarationAnalyzer()
	private statementAnalyzer = new StatementAnalyzer()

	private analyzeNode(
		statement: Statement | ModuleItem
	): WrappedStatement<Node> {
		switch (statement.type) {
			case 'FunctionDeclaration':
			case 'VariableDeclaration':
				return this.declarationAnalyzer.analyze(statement)
			case 'BlockStatement':
				return this.statementAnalyzer.analyze(statement)
			default:
				return new WrappedStatement(statement, AstFlag.Readonly)
		}
	}

	public *analyze() {
		for (const statement of this.program.body) {
			yield this.analyzeNode(statement)
		}
	}
}
