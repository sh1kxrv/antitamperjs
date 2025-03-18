import type { CallExpression } from '@swc/core'
import type { BNode } from '../api/node'

export class ExpCall implements BNode<CallExpression> {
	constructor() {}
	build(): CallExpression {
		return {}
	}
}
