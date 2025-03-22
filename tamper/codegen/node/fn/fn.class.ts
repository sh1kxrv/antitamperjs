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

class JsFn<T extends Node> implements BNode<T> {
	constructor(
		name?: string | null,
		isAsync: boolean = false,
		isGenerator: boolean = false
	) {
		this._identifier = new JsIdentifier(name ?? '_anon_')
		this._body = new JsStmtBlock()
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

	addParam(param: string) {
		const ident = new JsIdentifier(param)
		const paramNode = new JsFnParam(ident)
		this._params.push(paramNode)
		return {
			ident,
			param: paramNode
		}
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
		name: string,
		isAsync: boolean = false,
		isGenerator: boolean = false
	) {
		super(name, isAsync, isGenerator)
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
			ctxt: 0
		}
	}
}

export class JsFnArrow extends JsFn<ArrowFunctionExpression> {
	constructor(isAsync: boolean = false, isGenerator: boolean = false) {
		super(null, isAsync, isGenerator)
	}

	override build(): ArrowFunctionExpression {
		return {
			async: this.isAsync,
			generator: this.isGenerator,
			span: SPAN,
			params: this.params.map(param => param.build().pat),
			body: this.body.build(),
			type: 'ArrowFunctionExpression',
			ctxt: 0
		}
	}
}
