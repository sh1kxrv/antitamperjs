import { DeclaratorArrowFnAnalyzer } from '@/tamper/analyzer/decl/declarator/declarator.arrow-fn'
import { AstAnalyzer } from '@/tamper/api/api.analyzer'
import type { VariableDeclarator } from '@swc/core'

export class DeclaratorAnalyzer extends AstAnalyzer<VariableDeclarator> {
	constructor() {
		super(DeclaratorAnalyzer.name)
	}

	public arrowFnAnalyzer = new DeclaratorArrowFnAnalyzer()

	public override analyze(declarator: VariableDeclarator) {
		switch (declarator.init?.type) {
			case 'ArrowFunctionExpression':
				this.arrowFnAnalyzer.analyze(declarator.init)
				break
		}
	}
}
