import type { ModuleItem, Program, Statement } from '@swc/core'
import { FunctionAnalyzer } from './node/decl/decl.function'
import { VariableAnalyzer } from './node/decl/decl.variable'

export class Analyzer {
	private readonly fnAnalyzer = new FunctionAnalyzer()
	private readonly varAnalyzer = new VariableAnalyzer()

	constructor(private readonly program: Program) {}

	private analyzeStatement(statement: Statement | ModuleItem) {
		switch (statement.type) {
			case 'FunctionDeclaration':
				this.fnAnalyzer.analyze(statement)
				break
			case 'VariableDeclaration':
				this.varAnalyzer.analyze(statement)
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

	public get fnToTransform() {
		return this.fnAnalyzer.toTransform
	}

	public get arrowFnToTransform() {
		return this.varAnalyzer.toTransform
	}
}
