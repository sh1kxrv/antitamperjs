import type { BNode } from '@/tamper/api/api.node'
import { SPAN } from '@/utils'
import type { FunctionDeclaration } from '@swc/core'

export class DeclFunction implements BNode<FunctionDeclaration> {
	constructor(private readonly ctxt: number) {}

	build(): FunctionDeclaration {
		return {
			type: 'FunctionDeclaration',
			span: SPAN,
			ctxt: this.ctxt
		}
	}
}
