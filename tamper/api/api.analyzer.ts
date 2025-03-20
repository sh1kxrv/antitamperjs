import { WrappedStatement } from '@/tamper/api/api.statement'
import { setMemoryElement } from '@/tamper/utils/utils.memory'
import type { Node } from '@swc/core'

export abstract class AstAnalyzer<T extends Node> {
	constructor() {
		setMemoryElement(this.constructor, this)
	}
	protected marked: T[] = []
	public analyze(_statement: T): WrappedStatement<T> {
		throw new Error('Not implemented abstract method')
	}

	get markedStatements() {
		return this.marked
	}
}
