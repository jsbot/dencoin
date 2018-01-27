'use strict';

/**
 * Class which hold block structure
 * */
export default class Block {
	constructor(index, hash, previousHash, timestamp, data) {
		this.index = index;
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.data = data;
		this.hash = hash;
	}
}