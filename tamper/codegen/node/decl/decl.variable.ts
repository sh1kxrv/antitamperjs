import type { BNode } from '@/tamper/api/api.node'
import { SPAN } from '@/utils'
import type { VariableDeclaration } from '@swc/core'

export class DeclVariable implements BNode<VariableDeclaration> {
	constructor() {}

	build(): VariableDeclaration {
		return {
			type: 'VariableDeclaration',
			span: SPAN
		}
	}
}
