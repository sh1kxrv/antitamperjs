const proxified = new Proxy(global, {
	get(target, prop, receiver) {
		console.log('PROXY', target, prop, receiver)
		return target[prop]
	}
})

global = proxified

console.log(global.eval)

String.prototype.y = function () {
	const u = []
	for (let i = 0; i < 10; i++) {
		u.push(i)
	}
	return u.join(':')
}

function $x() {
	console.log(''.y())
	return
}

console.log($x())

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
