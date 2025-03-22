import type { BNode } from '@/tamper/api/api.node'
import { SPAN } from '@/utils'
import type { BinaryExpression } from '@swc/core'

export enum ExpBinaryOperator {
	Equal = '==',
	NotEqual = '!=',
	StrictEqual = '===',
	StrictNotEqual = '!==',
	Less = '<',
	LessOrEqual = '<=',
	Greater = '>',
	GreaterOrEqual = '>=',
	LeftShift = '<<',
	RightShift = '>>',
	UnsignedRightShift = '>>>',
	Plus = '+',
	Minus = '-',
	Multiply = '*',
	Divide = '/',
	Modulo = '%',
	BitOr = '|',
	BitXor = '^',
	BitAnd = '&',
	Or = '||',
	And = '&&',
	In = 'in',
	InstanceOf = 'instanceof',
	Power = '**',
	NullishCoalescing = '??'
}

export class JsExpBinary implements BNode<BinaryExpression> {
	constructor(
		private readonly operator: ExpBinaryOperator,
		private readonly left: BNode<any>,
		private readonly right: BNode<any>
	) {}

	build(): BinaryExpression {
		return {
			span: SPAN,
			type: 'BinaryExpression',
			operator: this.operator,
			left: this.left.build(),
			right: this.right.build(),
			ctxt: 0
		}
	}
}
