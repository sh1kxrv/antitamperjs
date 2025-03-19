import { FunctionTransformer } from '@/tamper/transform/transform.fn'
import type { Analyzer } from './analyzer'
import { transform, type Program } from '@swc/core'

export class Transformer {
	private fnTransformer: FunctionTransformer

	constructor(
		analyzer: Analyzer,
		private readonly program: Program
	) {
		this.fnTransformer = new FunctionTransformer(
			analyzer.declarationAnalyzer.fnDeclAnalyzer
		)
	}

	compile() {
		return transform(this.program, {
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
	}

	async transform() {
		this.fnTransformer.transform()

		const compiled = await this.compile()
		return compiled
	}
}
