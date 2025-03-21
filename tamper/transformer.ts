import type { WrappedStatement } from '@/tamper/api/api.statement'
import { transform, type Program, type Statement } from '@swc/core'

export class Transformer {
	constructor(private readonly stmts: WrappedStatement[]) {}

	private build(statements: Statement[]): Program {
		return {
			body: statements,
			span: {
				start: 1,
				end: 99999
			},
			interpreter: null!,
			type: 'Module'
		}
	}

	private compile() {
		const unwrapped = this.stmts.map(x => x.unwrap())
		const builded = this.build(unwrapped)

		return transform(builded, {
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

	transform() {
		return this.compile()
	}
}
