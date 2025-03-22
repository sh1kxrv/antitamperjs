import type { BNode } from '@/tamper/api/api.node'
import { WrappedStatement } from '@/tamper/api/api.statement'
import type { JsIdentifier } from '@/tamper/codegen/node/misc/identifier'
import { SPAN } from '@/utils'
import type { Param } from '@swc/core'

export class JsFnParam implements BNode<Param> {
	constructor(private readonly _pattern: JsIdentifier) {}
	build(): Param {
		return {
			pat: this._pattern.build(),
			type: 'Parameter',
			span: SPAN
		}
	}

	asWrapped(): WrappedStatement<Param> {
		return new WrappedStatement(this.build())
	}
}
