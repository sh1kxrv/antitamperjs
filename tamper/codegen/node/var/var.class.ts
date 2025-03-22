import type { BNode } from '@/tamper/api/api.node'
import type { JsVarDeclaration } from '@/tamper/codegen/node/var/var.declaration'
import { SPAN } from '@/utils'
import type { VariableDeclaration, VariableDeclarationKind } from '@swc/core'

export class JsVar implements BNode<VariableDeclaration> {
	private declarations: JsVarDeclaration[] = []
	constructor(private readonly kind: VariableDeclarationKind) {}

	build(): VariableDeclaration {
		return {
			span: SPAN,
			type: 'VariableDeclaration',
			declarations: this.declarations.map(decl => decl.build()),
			declare: false,
			kind: this.kind
		}
	}
}
