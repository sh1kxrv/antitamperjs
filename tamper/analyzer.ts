import type {
	ModuleItem,
	Program,
	Statement,
	VariableDeclaration
} from '@swc/core'
import consola from 'consola'

export class Analyzer {
	public readonly variables: VariableDeclaration[] = []
	constructor(private readonly program: Program) {}

	analyzeVariableDeclaration(node: VariableDeclaration) {
		consola.debug('Analyzing variable declaration', node)
		this.variables.push(node)
	}

	analyzeNode(node: ModuleItem | Statement) {
		switch (node.type) {
			case 'VariableDeclaration':
				this.analyzeVariableDeclaration(node)
				break
		}
	}

	async analyze() {
		for (const node of this.program.body) {
			this.analyzeNode(node)
		}
	}

	public getProgram() {
		return this.program
	}
}
