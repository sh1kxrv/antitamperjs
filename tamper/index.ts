import consola from 'consola'

import { parse, type FunctionDeclaration, type Statement } from '@swc/core'
import { Analyzer } from './analyzer'
import { WrappedFunctionDeclaration } from '@/tamper/analyzer/decl/decl.function'
import { Transformer } from '@/tamper/transformer'
import type { WrappedStatement } from '@/tamper/api/api.statement'
import { writeFile } from 'node:fs'

export class AntiTamper {
	constructor(private readonly code: string) {}

	async tamper() {
		const parsed = await parse(this.code)

		const analyzer = new Analyzer(parsed)
		const wrappedStatements = [...analyzer.analyze()]

		for (const wrapped of wrappedStatements.filter(x => x.isModifiable)) {
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

		const transformer = new Transformer(
			wrappedStatements as WrappedStatement<Statement>[]
		)
		const transformed = await transformer.transform()

		writeFile('out.js', transformed.code, () => {})

		consola.success('Transformed!')
	}
}
