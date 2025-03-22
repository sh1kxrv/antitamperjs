import { WrappedFunctionDeclaration } from '@/tamper/analyzer/decl/decl.function'
import { WrappedStatement } from '@/tamper/api/api.statement'
import {
	ExpBinaryOperator,
	JsExpBinary
} from '@/tamper/codegen/node/exp/exp.binary'
import { JsFnDecl } from '@/tamper/codegen/node/fn/fn.class'
import { Literal } from '@/tamper/codegen/node/misc/literal'
import { JsStmtReturn } from '@/tamper/codegen/node/stmt/stmt.return'
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
		const testFn = new JsFnDecl('test')
		testFn.addParam('a')

		const closuredFn = new JsFnDecl('inner')
		const { ident } = closuredFn.addParam('b')

		const ret = new JsStmtReturn(
			new JsExpBinary(ExpBinaryOperator.Multiply, ident, Literal.numeric(4))
		)
		closuredFn.body.push(ret)

		testFn.body.push(closuredFn)

		const builded = WrappedStatement.from(testFn)

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
