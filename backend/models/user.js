var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
	username: {type:String, required:true,unique:true},
	password:{type:String, required:true},
    email: String,
    city:String,
    phone:String
});



userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);