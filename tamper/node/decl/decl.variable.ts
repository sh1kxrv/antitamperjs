import type {
	ArrowFunctionExpression,
	VariableDeclaration,
	VariableDeclarator
} from '@swc/core'

export class VariableAnalyzer {
	private readonly arrowFns: ArrowFunctionExpression[] = []
	private analyzeFnExp(arrowFnExp: ArrowFunctionExpression) {
		if (
			arrowFnExp.body &&
			arrowFnExp.body.type === 'BlockStatement' &&
			arrowFnExp.body.stmts.length > 0 &&
			!arrowFnExp.async
		) {
			this.arrowFns.push(arrowFnExp)
		}
	}

	private analyzeDeclarator(declarator: VariableDeclarator) {
		switch (declarator.init?.type) {
			case 'ArrowFunctionExpression':
				this.analyzeFnExp(declarator.init)
		}
	}

	public analyze(declaration: VariableDeclaration) {
		for (const decl of declaration.declarations) {
			this.analyzeDeclarator(decl)
		}
	}

	public get toTransform() {
		return this.arrowFns
	}
}
