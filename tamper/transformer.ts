import type { Analyzer } from '@/tamper/analyzer'
import {
	transform,
	type FunctionDeclaration,
	type VariableDeclaration,
	type VariableDeclarator
} from '@swc/core'

export class Transformer {
	private readonly transformedFunctions: Record<string, string>
	constructor(private readonly analyzer: Analyzer) {}

	transformConst(declarations: VariableDeclarator[]) {
		for (const declarator of declarations) {
			if (declarator.init) {
				const initType = declarator.init.type
				switch (initType) {
					case 'StringLiteral':
						break
				}
			}
		}
	}

	transformVariableDeclaration(node: VariableDeclaration) {
		switch (node.kind) {
			case 'const':
				this.transformConst(node.declarations)
				break
		}
	}

	transformFunctionDeclaration(node: FunctionDeclaration) {
		if (node.body) {
			// Todo:
		}
	}

	async preTransform() {
		for (const variable of this.analyzer.variables) {
			this.transformVariableDeclaration(variable)
		}
	}

	async postTransform() {
		// ...
	}

	async transform() {
		await this.preTransform()

		const program = this.analyzer.getProgram()
		const transformed = await transform(program, {
			jsc: {
				parser: {
					syntax: 'ecmascript',
					jsx: false
				},
				target: 'es2022',
				loose: false,
				minify: {
					compress: false,
					mangle: false
				}
			},
			module: {
				type: 'es6'
			},
			isModule: true
		})
		return transformed
	}
}
