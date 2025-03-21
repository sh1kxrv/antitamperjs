import { JsFnAsync } from '@/tamper/codegen/node/fn/fn.async'
import { JsFn } from '@/tamper/codegen/node/fn/fn.class'
import { JsFnGenerator } from '@/tamper/codegen/node/fn/fn.generator'

export class JsFnFactory {
	static createAsync(ctxt: number) {
		return new JsFnAsync(ctxt)
	}

	static createSync(ctxt: number) {
		return new JsFn(ctxt)
	}

	static createGenerator(ctxt: number) {
		return new JsFnGenerator(ctxt)
	}
}
