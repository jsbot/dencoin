'use strict';
const crypto = require('crypto');
import Block from '../models/block';
//creating genesys Block. Start point of bockchain
const genesisBlock = new Block(0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', null, 1465154705, 'my genesis block!!');

//adding genesys as first block
const blockchain = [genesisBlock];

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
	//Method whaere we creating actual blocks
	generateNextBlock(blockData){
		const previousBlock = this._getLatestBlock();
		const nextIndex = previousBlock.index + 1;
		const nextTimestamp = new Date().getTime() / 1000;
		const nextHash = this._generateHash(nextIndex+previousBlock.hash+nextTimestamp+blockData);
		const newBlock = new Block(nextIndex, nextHash, previousBlock.hash, nextTimestamp, blockData);
		return newBlock;
	}
	//Method for adding block to chain
	addNewBlock(nextBlock){
		if(this._isValidBlockStructure(nextBlock))this.blockchain.push(nextBlock);
	}
	//Method for receiving latest chain
	getChain() {
		return this.blockchain;
	}
}