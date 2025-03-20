import { DeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.analyzer'
import { StatementAnalyzer } from '@/tamper/analyzer/stmt/stmt.analyzer'
import { AstAnalyzer, AstFlag } from '@/tamper/api/api.analyzer'
import { WrappedStatement } from '@/tamper/api/api.statement'
import type { BlockStatement, Statement } from '@swc/core'

export class WrappedBlockStatement extends WrappedStatement<BlockStatement> {
	private stmts: WrappedStatement<Statement>[] = []

	private declarationAnalyzer = new DeclarationAnalyzer()
	private statementAnalyzer = new StatementAnalyzer()

	constructor(statement: BlockStatement) {
		super(statement)
		for (const stmt of statement.stmts) {
			let analyzed: WrappedStatement<Statement>
			switch (stmt.type) {
				case 'FunctionDeclaration':
				case 'VariableDeclaration':
					analyzed = this.declarationAnalyzer.analyze(stmt)
					break
				case 'BlockStatement':
					analyzed = this.statementAnalyzer.analyze(stmt)
					break
				default:
					analyzed = new WrappedStatement(stmt, AstFlag.Readonly)
					break
			}
			this.stmts.push(analyzed)
		}
	}
}

export class BlockStatementAnalyzer extends AstAnalyzer<BlockStatement> {
	public override analyze(statement: BlockStatement): WrappedBlockStatement {
		return new WrappedBlockStatement(statement)
	}
}
