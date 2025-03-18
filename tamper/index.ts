import consola from 'consola'

import { parse } from '@swc/core'
import { Transformer } from '@/tamper/transformer'
import { writeFile } from 'node:fs'
import { Analyzer } from './analyzer'

export class AntiTamper {
	constructor(private readonly code: string) {}

	async tamper() {
		const parsed = await parse(this.code)

		const analyzer = new Analyzer(parsed)
		await analyzer.analyze()

		const transformer = new Transformer(analyzer)

		const transformed = await transformer.transform()

		writeFile('out.js', transformed.code, () => {})

		consola.success('Transformed!')
	}
}
