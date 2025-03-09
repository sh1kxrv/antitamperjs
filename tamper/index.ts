import consola from 'consola'

import { parse } from '@swc/core'
import { Analyzer } from '@/tamper/analyzer'
import { Transformer } from '@/tamper/transformer'
import { writeFile } from 'node:fs'

export class AntiTamper {
	constructor(private readonly code: string) {}

	async tamper() {
		const parsed = await parse(this.code)

		const analyzer = new Analyzer(parsed)
		await analyzer.analyze()

		const transformer = new Transformer(analyzer)

		const transformed = await transformer.transform()

		writeFile('tampered.js', transformed.code, () => {})

		consola.success('Transformed!')
	}
}
