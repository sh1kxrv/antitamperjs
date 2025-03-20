import { BlockStatementAnalyzer } from '@/tamper/analyzer/stmt/stmt.block'
import { AstAnalyzer, AstFlag } from '@/tamper/api/api.analyzer'
import { WrappedStatement } from '@/tamper/api/api.statement'
import type { Statement } from '@swc/core'

export class StatementAnalyzer extends AstAnalyzer<Statement> {
	private readonly blockStmtAnalyzer = new BlockStatementAnalyzer()

	public analyze(statement: Statement): WrappedStatement<Statement> {
		switch (statement.type) {
			case 'BlockStatement':
				return this.blockStmtAnalyzer.analyze(statement)
			default:
				return new WrappedStatement(statement, AstFlag.Readonly)
		}
	}
}
