var mongoose = require('mongoose');


var bidSchema  = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Owner : {
        user:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
        username:{type:String,required:true,default:''},
        phone:{type:String,require:true,default:''}
    },
   product:{type:mongoose.Schema.Types.ObjectId, ref: "Product"},
    bidAmount:{type:Number,required:true,default:0}

});

module.exports = mongoose.model("Bid",bidSchema);