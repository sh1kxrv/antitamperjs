import type { MemberExpression } from '@swc/core'
import type { BNode } from '@/tamper/api/api.node'

export class ExpMember implements BNode<MemberExpression> {
	build(): MemberExpression {
		return {}
	}
}
