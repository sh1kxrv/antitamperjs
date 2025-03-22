import type { BNode } from '@/tamper/api/api.node'
import { SPAN } from '@/utils'
import type { Identifier } from '@swc/core'

export class JsIdentifier implements BNode<Identifier> {
	constructor(
		public readonly name: string,
		public readonly isOptional: boolean = false
	) {}

	build(): Identifier {
		return {
			optional: this.isOptional,
			span: SPAN,
			type: 'Identifier',
			value: this.name,
			ctxt: 0
		}
	}
}
