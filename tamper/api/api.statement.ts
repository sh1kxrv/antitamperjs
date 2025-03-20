import { AstFlag } from '@/tamper/api/api.analyzer'
import type { Node } from '@swc/core'

export class WrappedStatement<T extends Node> {
	constructor(
		protected readonly statement: T,
		private flag = AstFlag.Modifiable
	) {}

	get isReadonly() {
		return (this.flag & AstFlag.Readonly) === AstFlag.Readonly
	}

	get isModifiable() {
		return this.flag === AstFlag.Modifiable
	}

	setFlag(_flag: AstFlag) {
		this.flag = _flag
	}

	unwrap() {
		return this.statement
	}
}
