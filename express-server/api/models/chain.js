'use strict';
const crypto = require('crypto');
import Block from '../models/block';
//creating genesys Block. Start point of bockchain
const genesisBlock = new Block(0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', null, 1465154705, 'my genesis block!!', 10, 0, null);

//adding genesys as first block
const blockchain = [genesisBlock];
const BLOCK_GENERATION_INTERVAL = 10;
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
/**
 * Main class for blockchain generation and manipulation
 * */
export default class Chain {
	constructor(){
		this.blockchain = blockchain;
	}
	//Hash generator based on noed native crypto
	_generateHash(input) {
		return crypto.createHash('sha256').update(input).digest('hex');
	}
	//Method for receiving last block in blockchain for manipulations
	_getLatestBlock(){
		return this.blockchain[this.blockchain.length-1];
	}
	//Simple validation methos for valid block structure
	_isValidBlockStructure (block) {
		return typeof
		block.index === 'number'
		&& typeof block.hash === 'string'
		&& typeof block.previousHash === 'string'
		&& typeof block.timestamp === 'number'
		&& typeof block.data === 'string';
	}
	//Publishing method to all pears
	_publishChain(){
		console.warn('chain published', this.blockchain);
	}
	//Validating of proof dificulty
	_hashMatchDificulty(hash, difficulty){
		let binaryHash = parseInt(hash, 16).toString(2);
		let requiredPrefix = '1'.repeat(difficulty);
		return binaryHash.startsWith(requiredPrefix);
	}
	//Method for changing mining dificulty
	_getAdjustedDifficulty(latestBlock, aBlockchain){
		let prevAdjustmentBlock = aBlockchain[aBlockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
		let timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
		let timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
		if (timeTaken < timeExpected / 2) {
			return prevAdjustmentBlock.difficulty + 1;
		} else if (timeTaken > timeExpected * 2) {
			return prevAdjustmentBlock.difficulty - 1;
		} else {
			return prevAdjustmentBlock.difficulty;
		}
	}
	//Method whaere we creating actual blocks
	generateNextBlock(blockData){
		return new Promise((resolve, reject) => {
			const previousBlock = this._getLatestBlock();
			const nextIndex = previousBlock.index + 1;
			const nextTimestamp = new Date().getTime() / 1000;
			let newBlock = this.findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, this.getDifficulty(this.getChain()));
			if(newBlock){
				this.addNewBlock(newBlock);
				resolve(newBlock);
			}else{
				reject('have error on creating new block');
			}

		});


	}
	//Method for adding block to chain
	addNewBlock(nextBlock){
		if(this._isValidBlockStructure(nextBlock))this.blockchain.push(nextBlock);
		this.updateLongestChain();
	}
	//Method for receiving latest chain
	getChain() {
		return this.blockchain;
	}
	//Public method for receiving chains from peers
	getOtherChains(){
		//socket request for chains
		return [];
	}
	//Method for replacing and setting actual chain
	updateLongestChain(){
		let chains = this.getOtherChains();
		chains.sort((c1, c2) => {
			return c2.length - c1.length;
		});
		if(chains.length > 0 && chains[0].length > this.getChain().length) this.blockchain = chains[0];
		//Publish Longes Chain
		this._publishChain();
	}
	//Main mining entry point. Here will be defined mined block
	findBlock (index, previousHash, timestamp, data, difficulty) {
		let nonce = 0;
		let iter = true;
		while (iter) {
			let hash = this._generateHash(index+previousHash+timestamp+data+difficulty+nonce);
			if (this._hashMatchDificulty(hash, difficulty)) {
				iter = false;
				this.transactions.addMiningTansaction();
				console.log('transactions-------->', this.transactions);
				return new Block(index, hash, previousHash, timestamp, data, difficulty, nonce, this.transactions);
			}
			nonce++;
		}
	}
	//Mining dificulty settings
	getDifficulty(aBlockchain) {
		let latestBlock = aBlockchain[aBlockchain.length - 1];
		if (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
			return this._getAdjustedDifficulty(latestBlock, aBlockchain);
		} else {
			return latestBlock.difficulty;
		}
	}
	addTransactionPool(transactions){
		this.transactions = transactions;
	}
	getLatesBlockIndex(){
		return this.blockchain[this.blockchain.length-1].index;
	}


}