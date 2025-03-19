import consola from 'consola'

import { parse } from '@swc/core'
import { writeFile } from 'node:fs'
import { Analyzer } from './analyzer'
import { Transformer } from '@/tamper/transformer'

export class AntiTamper {
	constructor(private readonly code: string) {}

	async tamper() {
		const parsed = await parse(this.code)

		const analyzer = new Analyzer(parsed)
		await analyzer.analyze()

		const transformer = new Transformer(analyzer, parsed)
		const transformed = await transformer.transform()

		writeFile('out.js', transformed.code, () => {})

		consola.success('Transformed!')
	}
}
