var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
	username: {type:String, required:true},
	password:{type:String, required:true},
    email: String,
    city:String,
    phone:String,
    userType:{ type:'String',default:'Client' ,required:true},
    aboutMe:{type:'String' ,default:''},
    hobbies:{type:'String',default:''},
    userImage:{type:'String',default:'allUsers/empty-user.png'},
    accountBalance:{type:Number,default:function getRndInteger(min=500, max=1000) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }}
});



userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);