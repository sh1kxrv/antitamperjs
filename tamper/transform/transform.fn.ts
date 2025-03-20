import type { FunctionDeclarationAnalyzer } from '@/tamper/analyzer/decl/decl.function'
import type { AstTransformer } from '@/tamper/api/api.transformer'
import consola from 'consola'

export class FunctionTransformer implements AstTransformer {
	constructor(private readonly fnAnalyzer: FunctionDeclarationAnalyzer) {}

	transform(): void {
		for (const fn of this.fnAnalyzer.markedStatements) {
			consola.debug('Transforming:', fn.identifier.value, fn.ctxt)
			// if(fn.body){

			// }
		}
	}
}
