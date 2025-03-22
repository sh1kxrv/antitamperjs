import type { BNode } from '@/tamper/api/api.node'
import type { JsFnArrow } from '@/tamper/codegen/node/fn/fn.class'
import { JsIdentifier } from '@/tamper/codegen/node/misc/identifier'
import type {
	JsNumericLiteral,
	JsStringLiteral
} from '@/tamper/codegen/node/misc/literal'
import { SPAN } from '@/utils'
import type { VariableDeclarator } from '@swc/core'

export class JsVarDeclaration implements BNode<VariableDeclarator> {
	private identifier: JsIdentifier
	constructor(
		readonly name: string,
		readonly init: JsStringLiteral | JsNumericLiteral | JsFnArrow
	) {
		this.identifier = new JsIdentifier(name)
	}

	build(): VariableDeclarator {
		return {
			definite: false,
			ctxt: 0,
			span: SPAN,
			type: 'VariableDeclarator',
			id: this.identifier.build(),
			init: this.init.build()
		}
	}
}
