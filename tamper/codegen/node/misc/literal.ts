import type { BNode } from '@/tamper/api/api.node'
import { SPAN } from '@/utils'
import type { NumericLiteral, StringLiteral } from '@swc/core'

export class JsNumericLiteral implements BNode<NumericLiteral> {
	constructor(private readonly value: number) {}

	build(): NumericLiteral {
		return {
			span: SPAN,
			type: 'NumericLiteral',
			value: this.value,
			ctxt: 0
		}
	}
}

export class JsStringLiteral implements BNode<StringLiteral> {
	constructor(private readonly value: string) {}

	build(): StringLiteral {
		return {
			span: SPAN,
			type: 'StringLiteral',
			value: this.value,
			ctxt: 0
		}
	}
}

export class Literal {
	static numeric(value: number) {
		return new JsNumericLiteral(value)
	}
	static string(value: string) {
		return new JsStringLiteral(value)
	}
}
