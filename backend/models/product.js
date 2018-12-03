var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Owner:{
        user:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
        username:{type:String,required:true}
    },
    biddable:{type:Boolean ,default:true},
    name:{type:String,required:true},
    amount:{type:Number,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    winner:{
        bid:{type:mongoose.Schema.Types.ObjectId, ref: "Bid"},
        username:{type:String,default:''},
        amount:{type:Number,default:0},
        productId:{type:mongoose.Schema.Types.ObjectId, ref: "Bid"}
    },
    received:{
        type:Boolean,
        default:false
    }

   
});



module.exports = mongoose.model("Product",productSchema);