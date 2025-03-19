import { DeclaratorAnalyzer } from '@/tamper/analyzer/decl/declarator/declarator.analyzer'
import { AstAnalyzer } from '@/tamper/api/api.analyzer'
import type { VariableDeclaration, VariableDeclarator } from '@swc/core'

export class VariableDeclarationAnalyzer extends AstAnalyzer<VariableDeclaration> {
	constructor() {
		super(VariableDeclarationAnalyzer.name)
	}

	private declaratorAnalyzer = new DeclaratorAnalyzer()

	private analyzeDeclarators(declarators: VariableDeclarator[]) {
		for (const declarator of declarators) {
			this.declaratorAnalyzer.analyze(declarator)
		}
	}

	public override analyze(declaration: VariableDeclaration) {
		this.analyzeDeclarators(declaration.declarations)
	}
}
