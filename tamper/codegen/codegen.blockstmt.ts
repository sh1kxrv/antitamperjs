import { UNKNOWN_SPAN } from '@/utils'
import type {
	Argument,
	BlockStatement,
	CallExpression,
	ComputedPropName,
	Expression,
	Identifier,
	MemberExpression,
	ReturnStatement,
	Statement,
	StringLiteral
} from '@swc/core'

type WrappedBlockStatement = {
	block: BlockStatement
	appendReturnStmt: (argument: Expression | undefined) => void
	createCallee: (
		calleeId: string,
		ctxt: number,
		args: Argument[]
	) => CallExpression
	createArgument: (expression: Expression) => Argument
	createMemberExpression: (
		identifierToObject: string,
		ctxt: number,
		property: MemberExpression['property']
	) => MemberExpression
	createComputedPropertyToRefString: (refStringId: string) => ComputedPropName
}

export class CodegenBlockStatement {
	createBlockStmt(ctxt: number): WrappedBlockStatement {
		const stmts: Statement[] = []

		const blockStatement: BlockStatement = {
			type: 'BlockStatement',
			span: UNKNOWN_SPAN,
			stmts,
			ctxt
		}

		const appendReturnStmt = (argument: Expression | undefined) => {
			const returnStmt: ReturnStatement = {
				type: 'ReturnStatement',
				span: UNKNOWN_SPAN,
				argument
			}
			stmts.push(returnStmt)
		}

		const createCallee = (calleeId: string, ctxt: number, args: Argument[]) => {
			const callee: Identifier = {
				type: 'Identifier',
				span: UNKNOWN_SPAN,
				ctxt: ctxt + 1,
				optional: false,
				value: calleeId
			}
			const calleeStmt: CallExpression = {
				type: 'CallExpression',
				span: UNKNOWN_SPAN,
				ctxt,
				callee,
				arguments: args
			}
			return calleeStmt
		}

		const createArgument = (expression: Expression) => {
			const argument: Argument = {
				expression,
				spread: null!
			}
			return argument
		}

		const createMemberExpression = (
			identifierToObject: string,
			ctxt: number,
			property: MemberExpression['property']
		) => {
			const object: Identifier = {
				type: 'Identifier',
				span: UNKNOWN_SPAN,
				ctxt: ctxt + 1,
				optional: false,
				value: identifierToObject
			}

			const memExp: MemberExpression = {
				type: 'MemberExpression',
				object,
				property,
				span: UNKNOWN_SPAN,
				ctxt
			}

			return memExp
		}

		const createComputedPropertyToRefString = (refStringId: string) => {
			const refStringLiteral: StringLiteral = {
				span: UNKNOWN_SPAN,
				type: 'StringLiteral',
				value: refStringId,
				raw: `\"${refStringId}\"`
			}
			const computedProp: ComputedPropName = {
				expression: refStringLiteral,
				span: UNKNOWN_SPAN,
				type: 'Computed'
			}
			return computedProp
		}

		return {
			block: blockStatement,
			appendReturnStmt,
			createCallee,
			createArgument,
			createMemberExpression,
			createComputedPropertyToRefString
		}
	}
}
