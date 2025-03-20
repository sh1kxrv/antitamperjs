function calculator() {
	function add(a, b) {
		return a + b
	}

	function sub(a, b) {
		return a - b
	}

	return {
		add,
		sub
	}
}

const calc = calculator()
const resultAdd = calc.add(1, 2)
const resultSub = calc.sub(1, 2)

console.log(resultAdd)
console.log(resultSub)
