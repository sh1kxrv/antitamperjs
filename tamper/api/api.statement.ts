import type { Node } from '@swc/core'

export class WrappedStatement<T extends Node> {
	constructor(private readonly statement: T) {}

	unwrap() {
		return this.statement
	}
}
