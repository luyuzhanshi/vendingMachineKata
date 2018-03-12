var VendingMachine = function(defaults){

	this.initialize = function(options){
		if(!options){
			options = {}
		}
		if(!options.coins){
			options.coins = {
				quarters: 10,
				nickels: 10,
				dimes: 10
			}
		}
		if(!options.inventory){
			options.inventory = {
				cola: 3,
				candy: 3,
				chips: 3
			}
		}
		if(!options.returnSlot){
			options.returnSlot = {
				quarters: 0,
				nickels: 0,
				dimes: 0,
				pennies: 0
			}
		}
		if(!options.prices){
			options.prices = {
				cola: 100,
				candy: 65,
				chips: 50
			}
		}
		this.coins = options.coins
		this.prices = options.prices
		this.inventory = options.inventory
		this.balance = 0
		this.returnSlot = options.returnSlot
		this.exactChangeOnly = !this.canMakeAnyChange()
		this.display = this.exactChangeOnly ? 'EXACT CHANGE ONLY' : 'INSERT COIN' 
	}	


	this.insertCoin = function(string){
		if (string == 'quarter'){
			this.balance += 25
			this.coins.quarters++
		}
		if (string == 'dime'){
			this.balance += 10
			this.coins.dimes++
		}
		if (string == 'nickel'){
			this.balance += 5
			this.coins.nickels++
		}			
		if (string == 'penny'){
			this.returnSlot.pennies++
		}
	}

	this.selectItem = function(itemName){
		var sufficientFunds = this.balance >= this.prices[itemName]
		if (this.inventory[itemName] < 1){
			this.display = 'SOLD OUT'
			return
		}
		if (sufficientFunds){
			this.productDispensed(itemName)
			return
		}
		if (!sufficientFunds && this.display.indexOf('PRICE') == -1 ){
			this.display = 'PRICE ' + this.prices[itemName]
			return
		}
		if (!sufficientFunds && this.balance == 0){
			this.display = this.exactChangeOnly ? 'EXACT CHANGE ONLY' : 'INSERT COIN' 
			return
		} 
		if (!sufficientFunds && this.balance > 0){
			this.display = this.balance
			return
		} 
	}

	this.productDispensed = function(itemName){
		this.display = 'THANK YOU'
		this.inventory[itemName] --
		if (this.exactChangeOnly){
			this.display = 'EXACT CHANGE ONLY'
		} else {
			this.makeChange()
		}
	}

	this.canMakeAnyChange = function(){
		for (var key in this.prices){
			var price = this.prices[key]
			var canMakeChange = this.canMakeChange(price)
			if (!canMakeChange) return false
		}
		return true
	}

	this.canMakeChange = function(price){
		var balance = 100
		var quarters = this.coins.quarters
		var dimes = this.coins.dimes
		var nickels = this.coins.nickels
		while (balance >= 0 && balance < price ){
			if (quarters > 0 && balance >= 25){
				quarters--
				balance -= 25
				continue
			}
			if (dimes > 0 && balance >= 10){
				dimes--
				balance -= 10
				continue
			}
			if (nickels > 0 && balance >= 5){
				nickels--
				balance -= 5
				continue
			}
			return false
		}
		return true
	}

	this.makeChange = function(){
		while (this.balance >= 0){
			if (this.coins.quarters > 0 && this.balance >= 25){
				this.coins.quarters --
				this.returnSlot.quarters ++
				this.balance -= 25
				continue
			}
			if (this.coins.dimes > 0 && this.balance >= 10){
				this.coins.dimes --
				this.returnSlot.dimes ++
				this.balance -= 10
				continue
			}
			if (this.coins.nickels > 0 && this.balance >= 5){
				this.coins.nickels --
				this.returnSlot.nickels ++
				this.balance -= 5
				continue
			}
			break
		}
		this.exactChangeOnly = this.canMakeChange()
	}

	this.returnCoins = function(){
		this.makeChange()
		this.display = 'INSERT COIN'
	}

	this.initialize(defaults)

}


module.exports = VendingMachine