import type { Node } from '@swc/core'

export abstract class AstAnalyzer<T extends Node> {
	private static ANALYZERS: Map<string, AstAnalyzer<Node>> = new Map()

	private static setAnalyzer(name: string, analyzer: AstAnalyzer<Node>) {
		AstAnalyzer.ANALYZERS.set(name, analyzer)
	}

	private static getAnalyzer<T extends Node>(name: string): AstAnalyzer<T> {
		return AstAnalyzer.ANALYZERS.get(name) as AstAnalyzer<T>
	}

	public getAnalyzer<T extends Node>(name: string): AstAnalyzer<T> {
		return AstAnalyzer.getAnalyzer(name)
	}

	constructor(name: string) {
		AstAnalyzer.setAnalyzer(name, this)
	}

	protected marked: T[] = []
	public analyze(_statement: T): void {}

	get markedStatements() {
		return this.marked
	}
}
