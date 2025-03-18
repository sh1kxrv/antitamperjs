import { SPAN } from '@/utils'
import type { BlockStatement, Statement } from '@swc/core'

export class StmtBlock {
	private statements: Statement[] = []
	constructor(private readonly ctxt: number) {}

	public push(statement: Statement) {
		this.statements.push(statement)
	}

	public unshift(statement: Statement) {
		this.statements.unshift(statement)
	}

	public build(): BlockStatement {
		return {
			type: 'BlockStatement',
			span: SPAN,
			stmts: this.statements,
			ctxt: this.ctxt
		}
	}

	public getStatements() {
		return this.statements
	}
}
