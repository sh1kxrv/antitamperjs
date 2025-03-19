import { DeclaratorArrowFnAnalyzer } from '@/tamper/analyzer/decl/declarator/declarator.arrow-fn'
import { AstAnalyzer } from '@/tamper/api/api.analyzer'
import type { VariableDeclarator } from '@swc/core'
import consola from 'consola'

export class DeclaratorAnalyzer extends AstAnalyzer<VariableDeclarator> {
	constructor() {
		super(DeclaratorAnalyzer.name)
	}

	public arrowFnAnalyzer = new DeclaratorArrowFnAnalyzer()

	public override analyze(declarator: VariableDeclarator) {
		consola.debug('ANALYZING DECLARATOR', declarator.init?.type)
		switch (declarator.init?.type) {
			case 'ArrowFunctionExpression':
				this.arrowFnAnalyzer.analyze(declarator.init)
				break
		}
	}
}
