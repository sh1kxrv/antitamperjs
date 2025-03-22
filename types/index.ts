import type {
	ArrayPattern,
	AssignmentPattern,
	BindingIdentifier,
	ObjectPattern,
	RestElement
} from '@swc/core'

export type Parameter =
	| BindingIdentifier
	| ArrayPattern
	| RestElement
	| ObjectPattern
	| AssignmentPattern
