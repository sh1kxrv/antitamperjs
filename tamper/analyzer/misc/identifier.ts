import { WrappedStatement } from '@/tamper/api/api.statement'
import type { Identifier } from '@swc/core'

export class WrappedIdentifier extends WrappedStatement<Identifier> {
	get name(): string {
		return this.statement.value
	}

	override unwrap(): Identifier {
		return this.statement
	}
}
