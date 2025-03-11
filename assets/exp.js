function randInt(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

function inner() {
	function test() {
		return randInt(4, 28)
	}

	const x = test()

	return x * 4
}

console.log(randInt(1, 2))
console.log(inner())
