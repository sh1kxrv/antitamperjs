import type { Expression, ReturnStatement } from '@swc/core'
import type { BNode } from '@/tamper/api/api.node'
import { SPAN } from '@/utils'

export class StmtReturn implements BNode<ReturnStatement> {
	constructor(private readonly expression: Expression) {}
	build(): ReturnStatement {
		return {
			type: 'ReturnStatement',
			span: SPAN,
			argument: this.expression
		}
	}
}
