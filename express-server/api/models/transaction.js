'use strict';

import conf from '../conf/dev';

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
		let haveMiner = false;
		this.txOut.map(outTx => {
			if(outTx.key == conf.MINER){
				outTx.amount  = outTx.amount + conf.REWARD;
				haveMiner = true;
			}
		});
		if(!haveMiner){
			this.txOut.push({key: conf.MINER, amount: conf.REWARD});
		}
		this.txIn.push({
			'key': conf.MINER,
			'amount': conf.REWARD,
			'from': 'chain'
		});

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
				});
				if(!inPool) {
					_this._addTxOutItem(txIn.key, txIn.amount);
					success = true;
				}
			}
		});
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
};