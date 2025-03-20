import consola from 'consola'

import { parse } from '@swc/core'
import { Analyzer } from './analyzer'
import { WrappedFunctionDeclaration } from '@/tamper/analyzer/decl/decl.function'

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
			}
		}

		// const transformer = new Transformer(analyzer, parsed)
		// const transformed = await transformer.transform()

		// writeFile('out.js', transformed.code, () => {})

		consola.success('Transformed!')
	}
}
