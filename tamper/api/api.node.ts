import type { Node } from '@swc/core'

export interface BNode<T extends Node> {
	build(): T
}
