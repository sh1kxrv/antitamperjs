export abstract class SharedClass {
	constructor() {
		const name = this.constructor.name
		SharedClass.setInstance(name, this)
	}

	private static CLASSES: Map<string, SharedClass> = new Map()

	private static setInstance(name: string, analyzer: SharedClass) {
		SharedClass.CLASSES.set(name, analyzer)
	}

	private static getInstance(name: string): SharedClass {
		return SharedClass.CLASSES.get(name) as SharedClass
	}

	public getInstance<T>(name: string): T {
		return SharedClass.getInstance(name) as T
	}
}
