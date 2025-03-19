import { FunctionDeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.function'
import { VariableDeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.variable'
import { AstAnalyzer } from '@/tamper/api/api.analyzer'
import type { Declaration } from '@swc/core'
import consola from 'consola'

export class DeclarationAnalyzer extends AstAnalyzer<Declaration> {
	constructor() {
		super(DeclarationAnalyzer.name)
	}

	public fnDeclAnalyzer = new FunctionDeclarationAnalyzer()
	public varDeclAnalyzer = new VariableDeclarationAnalyzer()

	public override analyze(declaration: Declaration): void {
		switch (declaration.type) {
			case 'FunctionDeclaration':
				this.fnDeclAnalyzer.analyze(declaration)
				break
			case 'VariableDeclaration':
				this.varDeclAnalyzer.analyze(declaration)
				break
		}
	}
}
