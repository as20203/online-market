var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    name:{type:String,required:true},
    amount:{type:Number,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
});



module.exports = mongoose.model("Product",productSchema);