import { DeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.analyzer'
import type { ModuleItem, Program, Statement } from '@swc/core'

export class Analyzer {
	constructor(private readonly program: Program) {}

	public declarationAnalyzer = new DeclarationAnalyzer()

	private analyzeStatement(statement: Statement | ModuleItem) {
		switch (statement.type) {
			case 'FunctionDeclaration':
			case 'VariableDeclaration':
				this.declarationAnalyzer.analyze(statement)
				break
			case 'BlockStatement':
				this.analyzeStatements(statement.stmts)
				break
		}
	}

	private analyzeStatements(statements: (Statement | ModuleItem)[]) {
		for (const statement of statements) {
			this.analyzeStatement(statement)
		}
	}

	public analyze() {
		this.analyzeStatements(this.program.body)
	}
}
