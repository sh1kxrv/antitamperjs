import { DeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.analyzer'
import { AstAnalyzer } from '@/tamper/api/api.analyzer'
import type { ModuleItem, Node, Program, Statement } from '@swc/core'

export class Analyzer extends AstAnalyzer<Node> {
	constructor(private readonly program: Program) {
		super()
	}

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

	public analyzeStatements(statements: (Statement | ModuleItem)[]) {
		for (const statement of statements) {
			this.analyzeStatement(statement)
		}
	}

	public analyze() {
		this.analyzeStatements(this.program.body)
	}
}
