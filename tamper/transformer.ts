import { WrappedFunctionDeclaration } from '@/tamper/analyzer/decl/decl.function'
import type { WrappedStatement } from '@/tamper/api/api.statement'
import { JsFnDecl } from '@/tamper/codegen/node/fn/fn.class'
import {
	transform,
	type FunctionDeclaration,
	type Program,
	type Statement
} from '@swc/core'
import consola from 'consola'

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
			type: 'Script'
		}
	}

	private compile() {
		const unwrapped = this.stmts.map(x => x.unwrap())
		const builded = this.build(unwrapped)

		// const astBacked = readFileSync('./rebuilded-ast.json', 'utf-8')
		// const builded = JSON.parse(astBacked) as Program

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

	private initialize() {
		const testFn = new JsFnDecl(3, 'test')
		testFn.addParam('a')

		const builded = testFn.asWrapped()

		consola.debug('Generated FN:', builded)

		this.stmts.unshift(builded)
	}

	private debugInfo() {
		for (const wrapped of this.stmts.filter(x => x.isModifiable)) {
			const unwrapped = wrapped.unwrap()
			consola.debug('Is modifiable:', unwrapped.type)
			if (wrapped instanceof WrappedFunctionDeclaration) {
				consola.debug('Fn:')
				consola.debug('-> Identifier:', wrapped.identifier.name)
				consola.debug('\t-> Body:')
				const stmts = wrapped.body?.getStatements<FunctionDeclaration>(
					WrappedFunctionDeclaration
				)
				consola.debug(stmts)
			}
		}
	}

	private mutate() {}

	transform() {
		this.debugInfo()
		this.initialize()
		this.mutate()
		return this.compile()
	}
}
