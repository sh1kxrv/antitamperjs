import type { Analyzer } from './analyzer'

export class Tranformer {
	constructor(private readonly analyzer: Analyzer) {}

	async transform(): string {
		return ''
	}
}
