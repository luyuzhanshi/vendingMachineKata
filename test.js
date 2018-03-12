var Tests = require('./vending-machine-test.js')
var tests = new Tests

for (key in tests){
	var result = tests[key]()
	var output = result ? 'passed' : 'failed'
	console.log(key, ': ' + output)
}