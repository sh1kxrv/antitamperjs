import { WrappedStatement } from '@/tamper/api/api.statement'
import { setMemoryElement } from '@/tamper/utils/utils.memory'
import type { Node } from '@swc/core'

export enum AstFlag {
	None = 0,
	Readonly = 1,
	Modifiable = 2
}

export abstract class AstAnalyzer<T extends Node> {
	constructor() {
		setMemoryElement(this.constructor, this)
	}
	public analyze(_statement: T): WrappedStatement<T> {
		throw new Error('Not implemented abstract method')
	}
}
