import mongoose from 'mongoose';
let userSchema = new mongoose.Schema ({
	email:{
		type:String, unique:true, required:true
	}, confirmed:Boolean, hash:String, salt:String
});

module.exports = mongoose.model ('users', userSchema);