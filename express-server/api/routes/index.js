// Import dependencies
import mongoose from 'mongoose';
import conf from '../conf/dev';
import Chain from '../models/chain';
import Transaction from '../models/transaction';

let api = (app) => {

	// Connect to mongodb
	mongoose.connect (conf.dbHost);

	let denChain = new Chain();
	let transactionsOut = new Transaction.TransactionOut();
	let transactionsPool = new Transaction.TransactionInst(denChain.getLatesBlockIndex(), [], transactionsOut.getTxOut());
	denChain.addTransactionPool(transactionsPool);

	app.get('/', (req, res) => {
		res.send ('api works');
	});

	app.get('/blocks', (req, res) => {
		res.send(denChain.getChain());
	});
	app.post('/mineBlock', (req, res) => {
		denChain.generateNextBlock(req.body.data).then(block => {
			transactionsPool = new Transaction.TransactionInst(denChain.getLatesBlockIndex(), [], transactionsOut.getTxOut());
			denChain.addTransactionPool(transactionsPool);
			//TODO: send block mined
			res.send(block);
		}, err => {
			res.send(err);
		});
	});
	app.post('/addTransaction', (req, res) => {
		//add notification for other peers
		let result = (transactionsOut.processTransaction(req.body.data))? {message: 'transaction added to pull'} : {message: 'transaction could not be completed'};
		if(result){
			transactionsPool.txIn.push(new Transaction.TransactionIn(req.body.data));
			transactionsPool.txOut = transactionsOut.getTxOut();
		}
		res.json(result);
	});
	app.post('/amount', (req, res) => {
		let filtered = transactionsPool.txOut.filter(miner => miner.key == req.body.data.from);
		let minerAmount = (filtered.length > 0)? filtered[0].amount: 'no amount available.';
		res.json({amount: minerAmount});
	});
	app.post('/history', (req, res) => {
		let customer = req.body.data.from;
		let currentBlockchain = denChain.getChain();
		let txIn = [];
		let txOut = [];
		let txInPool = [];
		currentBlockchain.map(block => {
			if(block.transactions){
				let filteredIn = block.transactions.txIn.filter(transaction => transaction.key == customer);
				txIn = txIn.concat(filteredIn);
				let filteredOut = block.transactions.txIn.filter(transaction => transaction.from == customer);
				txOut = txOut.concat(filteredOut);
			}
		});
		txInPool = txInPool.concat(transactionsPool.txIn.filter(transaction => transaction.from == customer));

		res.json({transactions: {
			in: txIn,
			out: txOut,
			pool: txInPool
		}
		});
	});

	/*app.get('/peers', (req, res) => {
		res.send(getSockets().map(( s: any ) => s._socket.remoteAddress + ':' + s._socket.remotePort));
	});
	app.post('/addPeer', (req, res) => {
		connectToPeers(req.body.peer);
		res.send();
	});*/

};


module.exports = api;