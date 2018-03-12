var VendingMachine = require('./vending_machine.js')

var Tests = function(){
		this['Quarters are accepted'] = function(){
		var vendingMachine = new VendingMachine
		var startingQuarters = vendingMachine.coins.quarters
		var startingBalance = vendingMachine.balance
		vendingMachine.insertCoin('quarter')
		var coinsIncremented = vendingMachine.coins.quarters == startingQuarters + 1
		var balanceIncremented = vendingMachine.balance == startingBalance + 25
		return coinsIncremented && balanceIncremented 
	} 
}
module.exports = Tests