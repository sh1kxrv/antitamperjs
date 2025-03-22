import consola from 'consola'

import { parse, type Statement } from '@swc/core'
import { Analyzer } from './analyzer'
import { Transformer } from '@/tamper/transformer'
import type { WrappedStatement } from '@/tamper/api/api.statement'
import { writeFile } from 'node:fs'

export class AntiTamper {
	constructor(private readonly code: string) {}

	async tamper() {
		const parsed = await parse(this.code)

		const analyzer = new Analyzer(parsed)
		const wrappedStatements = [...analyzer.analyze()]

		const transformer = new Transformer(
			wrappedStatements as WrappedStatement<Statement>[]
		)
		const transformed = await transformer.transform()

		writeFile('out.js', transformed.code, () => {})

		consola.success('Transformed!')
	}
}
