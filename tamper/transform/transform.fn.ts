import type { FunctionDeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.function'
import type { AstTransformer } from '@/tamper/api/api.transformer'

export class FunctionTransformer implements AstTransformer {
	constructor(private readonly fnAnalyzer: FunctionDeclarationAnalyzer) {}

	transform(): void {
		for (const fn of this.fnAnalyzer.markedStatements) {
			fn.identifier.value = '_piska_'
		}
	}
}
