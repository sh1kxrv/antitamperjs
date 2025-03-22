import type { BNode } from '@/tamper/api/api.node'
import type { JsExpBinary } from '@/tamper/codegen/node/exp/exp.binary'
import type { JsIdentifier } from '@/tamper/codegen/node/misc/identifier'
import { SPAN } from '@/utils'
import type { ReturnStatement } from '@swc/core'

export class JsStmtReturn implements BNode<ReturnStatement> {
	constructor(private readonly expression?: JsIdentifier | JsExpBinary) {}
	build(): ReturnStatement {
		return {
			span: SPAN,
			argument: this.expression?.build(),
			type: 'ReturnStatement',
			ctxt: 0
		}
	}
}
