'use strict';

//TODO: move const to config
const MINER = 'test1';
const REWARD = 50;

/**
 * Class which hold transaction structure
 * */
class Transaction {
	constructor(txId, txIn, txOut) {
		this.id = txId;
		this.txIn = txIn;
		this.txOut = txOut;
	}
	//simple adding miner reward
	addMiningTansaction(){
		this.txOut.map(outTx => {
			if(outTx.key == MINER){
				outTx.amount  = outTx.amount + REWARD;
			}
		})
		this.txIn.push({
			"key": MINER,
			"amount": REWARD,
			"from": "chain"
		})

	}
}
//Transaction transfer model
class TransactionIn{
	constructor(data) {
		this.key = data.key;
		this.amount = data.amount;
		this.from = data.from;
	}
}
//Model which holds actual coins in system
class TransactionOut{
	constructor() {
		this.txOut = [];
	}
	//Get current state of owners
	getTxOut(){
		return this.txOut;
	}
	//Method for performing trnsaction validy and update actual state
	processTransaction(txIn){
		let _this = this;
		let success = false;
		this.txOut.map(outTx => {
			if(outTx.key == txIn.from && outTx.amount >= txIn.amount){
				outTx.amount = outTx.amount - txIn.amount;
				let inPool = false;
				this.txOut.map(outTxInsert => {
					if(outTxInsert.key == txIn.key){
						outTxInsert.amount  = outTxInsert.amount + txIn.amount;
						inPool = true;
						success = true;
					}
				})
				if(!inPool) {
					_this._addTxOutItem(txIn.key, txIn.amount);
					success = true;
				}


			}
		})
		return success;
	}
	//Simple insert new owner
	_addTxOutItem(userKey, amount){
		this.txOut.push({key: userKey, amount: amount});
	}
}

module.exports = {
	TransactionInst : Transaction,
	TransactionIn: TransactionIn,
	TransactionOut: TransactionOut
}