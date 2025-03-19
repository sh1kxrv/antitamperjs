const _MEMORY = new Map<any, any>()

export function getMemoryElement<T>(key: any): T | undefined {
	return _MEMORY.get(key) as T
}

export function setMemoryElement(key: any, value: any): void {
	_MEMORY.set(key, value)
}
