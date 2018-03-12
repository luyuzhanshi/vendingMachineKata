var VendingMachine = require('./vending-machine.js')

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

	this['Dimes are accepted'] = function(){
		var vendingMachine = new VendingMachine
		var startingDimes = vendingMachine.coins.dimes
		var startingBalance = vendingMachine.balance
		vendingMachine.insertCoin('dime')
		var coinsIncremented = vendingMachine.coins.dimes == startingDimes + 1
		var balanceIncremented = vendingMachine.balance == startingBalance + 10
		return coinsIncremented && balanceIncremented 
	} 

	this['Nickels are accepted'] = function(){
		var vendingMachine = new VendingMachine
		var startingNickels = vendingMachine.coins.nickels
		var startingBalance = vendingMachine.balance
		vendingMachine.insertCoin('nickel')
		var coinsIncremented = vendingMachine.coins.nickels == startingNickels + 1
		var balanceIncremented = vendingMachine.balance == startingBalance + 5
		return coinsIncremented && balanceIncremented 
	} 

	this['Pennies are accepted'] = function(){
		var vendingMachine = new VendingMachine
		var startingReturnSlot = vendingMachine.returnSlot.pennies
		var startingBalance = vendingMachine.returnSlot.pennies
		vendingMachine.insertCoin('penny')
		var coinsIncremented = vendingMachine.returnSlot.pennies == startingReturnSlot + 1
		var balanceIncremented = vendingMachine.returnSlot.pennies == startingBalance + 1
		return coinsIncremented && balanceIncremented 
	} 

	this['When insufficient money is detected for cola, then display shows PRICE and cost of cola'] = function(){
		var vendingMachine = new VendingMachine
		vendingMachine.selectItem('cola')
		var isDisplayCorrect = vendingMachine.display == 'PRICE ' + vendingMachine.prices.cola
		return isDisplayCorrect
	} 

	this['When insufficient money is detected and there the balance is 0, then display shows INSERT COIN'] = function(){
		var vendingMachine = new VendingMachine
		vendingMachine.selectItem('cola')
		vendingMachine.selectItem('cola')
		var expected = 'INSERT COIN' 
		var actual = vendingMachine.display
		var result = actual == expected
		return result
	} 

	this['When insufficient money is detected and there the balance is > 0, then display shows CURRENT BALANCE'] = function(){
		var vendingMachine = new VendingMachine
		vendingMachine.insertCoin('quarter')
		vendingMachine.selectItem('cola')
		vendingMachine.selectItem('cola')
		var expected = vendingMachine.balance 
		var actual = vendingMachine.display
		var result = actual == expected
		return result
	} 

	this['When product is selected and balance is enough product will be dispensed and machine will say thank you'] = function(){
		var vendingMachine = new VendingMachine
		vendingMachine.insertCoin('quarter')
		vendingMachine.insertCoin('quarter')
		vendingMachine.insertCoin('quarter')
		vendingMachine.insertCoin('quarter')
		vendingMachine.selectItem('cola')
		var expected = 'THANK YOU' 
		var actual = vendingMachine.display
		var result = actual == expected
		return result
	}

	this['Test to see if the amount returned is the amount left after subtracting the price of the selected product from the balance'] = function(){
		var vendingMachine = new VendingMachine
		vendingMachine.insertCoin('quarter')
		vendingMachine.insertCoin('quarter')
		vendingMachine.insertCoin('quarter')
		vendingMachine.insertCoin('quarter')
		vendingMachine.insertCoin('dime')
		vendingMachine.selectItem('cola')
		var expected = 1
		var actual = vendingMachine.returnSlot.dimes 
		var result = actual == expected
		return result
	}

	this['Test to see if the returnSlot is equal to the amount inserted and display == INSERT COIN'] = function(){
		var vendingMachine = new VendingMachine
		vendingMachine.insertCoin('quarter')
		vendingMachine.returnCoins()
		var expected = 1
		var actual = vendingMachine.returnSlot.quarters 
		var result = actual == expected
		return result
	}

	this['Test to see if items are sold out'] = function(){
		var vendingMachine = new VendingMachine({
			inventory:{
				cola:0
			}
		})
		vendingMachine.selectItem('cola')
		var expected = 'SOLD OUT'
		var actual = vendingMachine.display 
		var result = actual == expected
		return result
	}

}
module.exports = Tests