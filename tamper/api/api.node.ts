import type { WrappedStatement } from '@/tamper/api/api.statement'
import type { Node } from '@swc/core'

export interface BNode<T extends Node = Node> {
	build(): T
}
