import { AstFlag } from '@/tamper/api/api.analyzer'
import type { Statement } from '@swc/core'

export class WrappedStatement<T extends { type: string } = Statement> {
	readonly type: string
	constructor(
		protected readonly statement: T,
		private flag = AstFlag.Modifiable
	) {
		this.type = statement.type
	}

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
