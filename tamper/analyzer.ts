import type {
  FunctionDeclaration,
  ModuleItem,
  Program,
  Statement,
  VariableDeclaration,
} from '../types/swc/index.ts'

export class Analyzer {
  public readonly variables: VariableDeclaration[] = []
  public readonly functions: FunctionDeclaration[] = []
  constructor(private readonly program: Program) {}

  analyzeVariableDeclaration(node: VariableDeclaration) {
    this.variables.push(node)
  }

  analyzeFunctionDeclaration(node: FunctionDeclaration) {
    this.functions.push(node)
  }

  analyzeNode(node: ModuleItem | Statement) {
    switch (node.type) {
      case 'VariableDeclaration':
        this.analyzeVariableDeclaration(node)
        break
      case 'FunctionDeclaration':
        this.analyzeFunctionDeclaration(node)
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

  public getBody() {
    return this.program.body
  }
}
