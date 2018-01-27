// Import dependencies
import mongoose from 'mongoose';
import conf from '../conf/dev';
import Chain from '../models/chain';

let api = (app) => {

	// Connect to mongodb
	mongoose.connect (conf.dbHost);
	let denChain = new Chain();

	app.get('/', (req, res) => {
		let newBlock = denChain.generateNextBlock('test');
		denChain.addNewBlock(newBlock);
		console.warn('test--------->', denChain.getChain());
		res.send ('api works');
	});


};


module.exports = api;