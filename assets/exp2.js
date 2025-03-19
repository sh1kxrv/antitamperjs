const T = '1234'

function test() {
	function a() {
		function b() {
			function c() {
				return 1
			}
		}
	}

	function test2() {
		console.log('test')
	}
}
