import type { Analyzer } from '@/tamper/analyzer'
import { CodegenBlockStatement } from '@/tamper/codegen/codegen.blockstmt'
import { CodegenVariable } from '@/tamper/codegen/codegen.variable'
import { NameGen } from '@/tamper/name-gen'
import { UNKNOWN_SPAN } from '@/utils'
import {
	transform,
	type BlockStatement,
	type Expression,
	type ExpressionStatement,
	type FunctionDeclaration,
	type ReturnStatement,
	type VariableDeclaration,
	type VariableDeclarator
} from '@swc/core'
import consola from 'consola'

export class Transformer {
	private tamperedVariableName: string = ''
	private readonly funcBodies: Record<string, BlockStatement> = {}
	private readonly postTransformedFunctions: Record<
		string,
		FunctionDeclaration
	> = {}

	private readonly nameGen = new NameGen()
	private readonly variableCg = new CodegenVariable()
	private readonly blockStmtCg = new CodegenBlockStatement()

	constructor(private readonly analyzer: Analyzer) {}

	transformConst(declarations: VariableDeclarator[]) {
		for (const declarator of declarations) {
			if (declarator.init) {
				const initType = declarator.init.type
				switch (initType) {
					case 'StringLiteral':
						break
				}
			}
		}
	}

	transformVariableDeclaration(node: VariableDeclaration) {
		switch (node.kind) {
			case 'const':
				this.transformConst(node.declarations)
				break
		}
	}

	transformFunctionDeclaration(node: FunctionDeclaration) {
		if (node.body) {
			const bodyAst = Object.assign({}, node.body)

			const lastStmt = bodyAst.stmts.at(-1)
			if (lastStmt?.type === 'ReturnStatement') {
				const retStmt = bodyAst.stmts.pop()! as ReturnStatement
				if (retStmt.argument && retStmt.argument?.type.includes('Expression')) {
					const expStmt: ExpressionStatement = {
						expression: retStmt.argument as Expression,
						span: UNKNOWN_SPAN,
						type: 'ExpressionStatement'
					}
					bodyAst.stmts.push(expStmt)
				}
			}

			const name = this.nameGen.generate(8)
			this.postTransformedFunctions[name] = node
			this.funcBodies[name] = bodyAst
			node.body = undefined
		}
	}

	async blockStatementTransform(block: BlockStatement) {
		const transformed = await transform(
			{
				body: block.stmts,
				interpreter: null!,
				span: block.span,
				ctxt: 0,
				type: 'Module'
			},
			{
				minify: true
			}
		)
		return transformed.code.replaceAll('"', '\\"')
	}

	async preTransform() {
		for (const variable of this.analyzer.variables) {
			this.transformVariableDeclaration(variable)
		}

		for (const func of this.analyzer.functions) {
			consola.debug(func)
			this.transformFunctionDeclaration(func)
		}
	}

	async postTransform() {
		const body = this.analyzer.getBody()
		this.tamperedVariableName = `$${this.nameGen.generate(6)}`
		const variable = this.variableCg.createVariable(
			this.tamperedVariableName,
			'const'
		)

		for (const funcName of Object.keys(this.postTransformedFunctions)) {
			const body = this.funcBodies[funcName]
			if (body) {
				const transformed = await this.blockStatementTransform(body)
				variable.appendKeyValueProperty(
					funcName,
					transformed.replace(/\n/g, '')
				)
			}
		}

		for (const funcName of Object.keys(this.postTransformedFunctions)) {
			const func = this.postTransformedFunctions[funcName]!

			const blockStmtWrapped = this.blockStmtCg.createBlockStmt(0)
			const memExpProp =
				blockStmtWrapped.createComputedPropertyToRefString(funcName)
			const memExp = blockStmtWrapped.createMemberExpression(
				this.tamperedVariableName,
				2,
				memExpProp
			)
			const arg = blockStmtWrapped.createArgument(memExp)
			const callee = blockStmtWrapped.createCallee('eval', 1, [arg])
			blockStmtWrapped.appendReturnStmt(callee)

			func.body = blockStmtWrapped.block
		}

		body.unshift(variable.variable)
	}

	async transform() {
		await this.preTransform()
		await this.postTransform()

		const program = this.analyzer.getProgram()
		const transformed = await transform(program, {
			jsc: {
				parser: {
					syntax: 'ecmascript',
					jsx: false
				},
				target: 'es2022',
				loose: false,
				minify: {
					compress: false,
					mangle: false
				}
			},
			module: {
				type: 'es6'
			},
			isModule: true
		})
		return transformed
	}
}
