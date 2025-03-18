import type { ExpCall } from '../exp/exp.call'
import type { ExpMember } from '../exp/exp.member'
import type { Argument as SwcArgument } from '@swc/core'

export class Argument {
	constructor(private readonly expression: ExpCall | ExpMember) {}
	public build(): SwcArgument {
		const buildedArgument = this.expression.build()
		return {
			expression: buildedArgument,
			spread: null!
		}
	}
}
