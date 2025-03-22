import type { BNode } from '@/tamper/api/api.node'
import { JsFnParam } from '@/tamper/codegen/node/misc/param'
import { JsIdentifier } from '@/tamper/codegen/node/misc/identifier'
import { JsStmtBlock } from '@/tamper/codegen/node/stmt/stmt.block'
import { SPAN } from '@/utils'
import type {
	ArrowFunctionExpression,
	FunctionDeclaration,
	Node
} from '@swc/core'
import type { WrappedStatement } from '@/tamper/api/api.statement'
import { WrappedFunctionDeclaration } from '@/tamper/analyzer/decl/decl.function'
import { WrappedArrowFn } from '@/tamper/analyzer/decl/declarator/declarator.arrow-fn'

class JsFn<T extends Node> implements BNode<T> {
	constructor(
		protected readonly ctxt: number,
		name?: string | null,
		isAsync: boolean = false,
		isGenerator: boolean = false
	) {
		this._identifier = new JsIdentifier(ctxt - 1, name ?? '_anon_')
		this._body = new JsStmtBlock(ctxt)
		this._isAsync = isAsync
		this._isGenerator = isGenerator
	}
	private _params: JsFnParam[] = []
	private _isAsync: boolean
	private _isGenerator: boolean
	private _body: JsStmtBlock
	private _identifier: JsIdentifier

	build(): T {
		throw new Error('JsFn not implemented build')
	}

	asWrapped(): WrappedStatement<T> {
		throw new Error('JsFn not implemented asWrapped')
	}

	addParam(param: string) {
		const paramNode = new JsFnParam(new JsIdentifier(this.ctxt, param))
		this._params.push(paramNode)
		return param
	}

	get params() {
		return this._params
	}

	get isAsync() {
		return this._isAsync
	}

	get isGenerator() {
		return this._isGenerator
	}

	get body() {
		return this._body
	}

	get identifier() {
		return this._identifier
	}

	get name() {
		return this._identifier.name
	}
}

export class JsFnDecl extends JsFn<FunctionDeclaration> {
	constructor(
		ctxt: number,
		name: string,
		isAsync: boolean = false,
		isGenerator: boolean = false
	) {
		super(ctxt, name, isAsync, isGenerator)
	}
	override build(): FunctionDeclaration {
		return {
			type: 'FunctionDeclaration',
			params: this.params.map(param => param.build()),
			async: this.isAsync,
			generator: this.isGenerator,
			span: SPAN,
			body: this.body.build(),
			declare: false,
			identifier: this.identifier.build(),
			ctxt: this.ctxt
		}
	}

	override asWrapped(): WrappedFunctionDeclaration {
		return new WrappedFunctionDeclaration(this.build())
	}
}

export class JsFnArrow extends JsFn<ArrowFunctionExpression> {
	constructor(
		ctxt: number,
		isAsync: boolean = false,
		isGenerator: boolean = false
	) {
		super(ctxt, null, isAsync, isGenerator)
	}

	override build(): ArrowFunctionExpression {
		return {
			async: this.isAsync,
			generator: this.isGenerator,
			span: SPAN,
			params: this.params.map(param => param.build().pat),
			body: this.body.build(),
			type: 'ArrowFunctionExpression',
			ctxt: this.ctxt
		}
	}

	override asWrapped(): WrappedArrowFn {
		return new WrappedArrowFn(this.build())
	}
}
