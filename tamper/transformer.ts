import type { Analyzer } from '@/tamper/analyzer'
import { transform } from '@swc/core'
import consola from 'consola'

export class Transformer {
	constructor(private readonly analyzer: Analyzer) {}

	async preTransform() {
		for (const variable of this.analyzer.variables) {
			consola.debug('Variable', variable)
		}
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
