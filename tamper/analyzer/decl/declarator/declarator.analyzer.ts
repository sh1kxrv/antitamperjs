import { DeclaratorArrowFnAnalyzer } from '@/tamper/analyzer/decl/declarator/declarator.arrow-fn'
import { AstAnalyzer, AstFlag } from '@/tamper/api/api.analyzer'
import { WrappedStatement } from '@/tamper/api/api.statement'
import type { Expression, VariableDeclarator } from '@swc/core'

export class WrappedDeclarator extends WrappedStatement<VariableDeclarator> {
	private arrowFnAnalyzer = new DeclaratorArrowFnAnalyzer()
	init?: WrappedStatement<Expression>

	constructor(declarator: VariableDeclarator, flag: AstFlag) {
		super(declarator, flag)
		if (declarator.init) {
			const type = declarator.init.type
			switch (type) {
				case 'ArrowFunctionExpression':
					this.init = this.arrowFnAnalyzer.analyze(declarator.init)
					break
				default:
					this.init = new WrappedStatement<Expression>(
						declarator.init,
						AstFlag.Readonly
					)
					break
			}
		}
	}
}

export class DeclaratorAnalyzer extends AstAnalyzer<VariableDeclarator> {
	public override analyze(declarator: VariableDeclarator): WrappedDeclarator {
		return new WrappedDeclarator(declarator, AstFlag.Modifiable)
	}
}
