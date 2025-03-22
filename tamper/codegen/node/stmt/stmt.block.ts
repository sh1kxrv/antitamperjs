import type { BNode } from '@/tamper/api/api.node'
import { SPAN } from '@/utils'
import type { BlockStatement, Statement } from '@swc/core'

export class JsStmtBlock implements BNode<BlockStatement> {
	private _stmts: BNode<Statement>[] = []
	push(stmt: BNode<any>) {
		this._stmts.push(stmt)
	}

	unshift(stmt: BNode<any>) {
		this._stmts.unshift(stmt)
	}

	insert(stmt: BNode<any>, index: number) {
		this._stmts.splice(index, 0, stmt)
	}

	build(): BlockStatement {
		return {
			span: SPAN,
			stmts: this._stmts.map(stmt => stmt.build()),
			type: 'BlockStatement',
			ctxt: 0
		}
	}
}
