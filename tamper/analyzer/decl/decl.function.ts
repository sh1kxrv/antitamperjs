import { AstAnalyzer, AstFlag } from '@/tamper/api/api.analyzer'
import type { FunctionDeclaration } from '@swc/core'
import { WrappedStatement } from '@/tamper/api/api.statement'
import { WrappedBlockStatement } from '@/tamper/analyzer/stmt/stmt.block'
import { WrappedIdentifier } from '@/tamper/analyzer/misc/identifier'

export class WrappedFunctionDeclaration extends WrappedStatement<FunctionDeclaration> {
	body?: WrappedBlockStatement
	identifier: WrappedIdentifier

	constructor(
		statement: FunctionDeclaration,
		flag: AstFlag = AstFlag.Modifiable
	) {
		super(statement, flag)
		if (statement.body) {
			this.body = new WrappedBlockStatement(statement.body)
		}

		this.identifier = new WrappedIdentifier(
			statement.identifier,
			AstFlag.Modifiable
		)
	}

	override unwrap(): FunctionDeclaration {
		return {
			...this.statement,
			body: this.body?.unwrap(),
			identifier: this.identifier.unwrap()
		}
	}
}

export class FunctionDeclarationAnalyzer extends AstAnalyzer<FunctionDeclaration> {
	public override analyze(
		statement: FunctionDeclaration
	): WrappedFunctionDeclaration {
		if (
			!statement.async &&
			statement.body?.stmts &&
			statement.body?.stmts.length > 0
		) {
			return new WrappedFunctionDeclaration(statement)
		}
		return new WrappedFunctionDeclaration(statement, AstFlag.Readonly)
	}
}
