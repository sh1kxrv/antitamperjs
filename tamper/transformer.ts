import type { Analyzer } from './analyzer'
import { transform, type Program } from '@swc/core'

export class Transformer {
	constructor(
		analyzer: Analyzer,
		private readonly program: Program
	) {}

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
		const compiled = await this.compile()
		return compiled
	}
}
