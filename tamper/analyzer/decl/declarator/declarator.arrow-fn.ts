import { AstAnalyzer } from '@/tamper/api/api.analyzer'
import type { ArrowFunctionExpression } from '@swc/core'

export class DeclaratorArrowFnAnalyzer extends AstAnalyzer<ArrowFunctionExpression> {
	public override analyze(statement: ArrowFunctionExpression): void {
		if (
			statement.body &&
			statement.body.type === 'BlockStatement' &&
			statement.body.stmts.length > 0 &&
			!statement.async
		) {
			this.marked.push(statement)
		}
	}
}
