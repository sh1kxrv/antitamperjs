import type { BNode } from '@/tamper/api/api.node'
import type { WrappedStatement } from '@/tamper/api/api.statement'
import { SPAN } from '@/utils'
import type { VariableDeclaration, VariableDeclarationKind } from '@swc/core'

export class JsVar implements BNode<VariableDeclaration> {
	constructor(private readonly kind: VariableDeclarationKind) {}

	asWrapped(): WrappedStatement<VariableDeclaration> {
		throw new Error('Method not implemented.')
	}

	build(): VariableDeclaration {
		return {
			span: SPAN,
			type: 'VariableDeclaration',
			declarations: [],
			declare: false,
			kind: this.kind
		}
	}
}
