// Import dependencies
import mongoose from 'mongoose';
import conf from '../conf/dev';

let api = (app) => {

	require ('../models/index');

	// Connect to mongodb
	mongoose.connect (conf.dbHost);


	// create mongoose schema
	const userSchema = new mongoose.Schema ({
		name:String, age:Number
	});

	// create mongoose model
	const User = mongoose.model ('Userschema', userSchema);

	/* GET api listing. */
	app.get ('/', (req, res) => {
		res.send ('api works');
	});


};


module.exports = api;