import { UNKNOWN_SPAN } from '@/utils'
import type { BlockStatement, FunctionDeclaration, Statement } from '@swc/core'

export class CodegenFunction {
	constructor() {}

	createFn(name: string, body: BlockStatement) {
		const fnDecl: FunctionDeclaration = {
			async: false,
			body,
			declare: false,
			decorators: [],
			generator: false,
			identifier: {
				type: 'Identifier',
				optional: false,
				span: UNKNOWN_SPAN
			}
		}
		return fnDecl
	}
}
