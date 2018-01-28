// Import dependencies
import mongoose from 'mongoose';
import conf from '../conf/dev';
import Chain from '../models/chain';

let api = (app) => {

	// Connect to mongodb
	mongoose.connect (conf.dbHost);
	let denChain = new Chain();

	app.get('/', (req, res) => {
		res.send ('api works');
	});

	app.get('/blocks', (req, res) => {
		res.send(denChain.getChain());
	});
	app.post('/mineBlock', (req, res) => {
		let newBlock = denChain.generateNextBlock(req.body.data);
		res.send(newBlock);
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