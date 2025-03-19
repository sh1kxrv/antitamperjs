import { SharedClass } from '@/tamper/utils/utils.shared-class'
import type { Node } from '@swc/core'

export abstract class AstAnalyzer<T extends Node> extends SharedClass {
	protected marked: T[] = []
	public analyze(_statement: T): void {}

	get markedStatements() {
		return this.marked
	}
}
