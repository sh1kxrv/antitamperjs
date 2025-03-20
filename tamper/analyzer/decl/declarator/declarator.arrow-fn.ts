import { AstAnalyzer, AstFlag } from '@/tamper/api/api.analyzer'
import { WrappedStatement } from '@/tamper/api/api.statement'
import type { ArrowFunctionExpression } from '@swc/core'

export class WrappedArrowFn extends WrappedStatement<ArrowFunctionExpression> {}

export class DeclaratorArrowFnAnalyzer extends AstAnalyzer<ArrowFunctionExpression> {
	public override analyze(statement: ArrowFunctionExpression): WrappedArrowFn {
		if (
			statement.body &&
			statement.body.type === 'BlockStatement' &&
			statement.body.stmts.length > 0 &&
			!statement.async
		) {
			return new WrappedArrowFn(statement)
		}
		return new WrappedArrowFn(statement, AstFlag.Readonly)
	}
}
