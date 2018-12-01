const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');
const Product = require('../models/product');
var User  = require('../models/user');
var Bid   = require('../models/bid');
const jwt = require("jsonwebtoken");

const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./allProducts/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
})


const fileFilter = (req,file,cb) =>{
    if(file.mimetype ==='image/png' || file.mimetype==='image/jpeg'){
        cb(null,true);
    }else{
        req.error = "Only jpeg or png file format allowed."
        cb(null,false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
    fileSize:1024*1024*6
    },
    fileFilter:fileFilter
})


router.get("/", (req,res,next) => {
        let decoded = null;
   
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
        
           decoded = jwt.decode(token,process.env.JWT_KEY)
        
            req.userData = decoded;
           

        }
        
        
       

        if(decoded && req.userData.type==="Admin"){
            Product.find()
            .select("_id name  description image category")
            .exec()
            .then(docs => {
                const response ={
                    products: docs.map(doc => {
                        return {
                           
                            name: doc.name,
                            description:doc.description,
                            productImage: doc.image,
                            _id: doc._id,
                            category:doc.category
                        };
                    })
                };
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
    
        }else{
            Product.find({biddable:true})
            .select("_id name  description image category")
            .exec()
            .then(docs => {
                const response ={
                    products: docs.map(doc => {
                        return {
                           
                            name: doc.name,
                            description:doc.description,
                            productImage: doc.image,
                            _id: doc._id,
                            category:doc.category
                        };
                    })
                };
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });

        }
       
    
   

    

 
});


router.post("/",upload.single('image') ,checkAuth, (req, res, next) => {

     //File isn't png or jpg.
     if(req.error){
        return res.status(401).json({
            message:req.error
        })
    }

    if(req.userData.type==="Admin"){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
   

    Product.find({name:req.body.productname})
    .exec()
    .then(product=>{
        if(product.length>=1){
            return res.status(420).json({
                message:'Product Name Exists.'
            })
        }else{
            const owner={
                user:req.userData.id,
                username:req.userData.username
              }
            
              const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                user:req.userData.id,
                name:req.body.productname,
                Owner:owner,
                amount:req.body.amount,
               description:req.body.description,
               image:req.file.path,
               category:req.body.category
            
              
            });
              
                product
                  .save()
                  .then(result => {
                 
                    res.status(201).json({
                      message: "Created product successfully",
                     
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                    error: err
                    });
                });

        }
    })
  
  });


  router.get("/:productId",checkAuth, (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
      .select("_id Owner.username name amount description category biddable  image")
      .exec()
      .then(doc => {
        Bid.find({product:req.params.productId})
        .exec()
        .then(bids=>{
            if (doc) {
                const sortedBids = bids.sort((a,b)=>{
                    return b.bidAmount-a.bidAmount;
                 })
               
           
                res.status(200).json({
                  product: doc,
                  bids:sortedBids,
                  user:req.userData
                });
              } else {
                res.status(404).json({ 
                    message: "No valid entry found for provided ID" });
              }
           
        
        
        })
      })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {

    const id = req.params.id;
   
    Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



router.post("/bid/:id",checkAuth,(req,res,next)=>{
 
   let room = ''+req.params.id;

  

    //Step:1 Get the user.
    Bid.find({"Owner.user":req.userData.id,product:req.params.id})
    .exec()
    .then(bid=>{
        if(bid.length>=1){
            //bid exists already
           User.findById(req.userData.id)
           .exec()
           .then(user=>{
            
              
            if( (user.accountBalance< req.body.bidAmount)||(bid[0].bidAmount>req.body.bidAmount)){
                return res.status(401).json({
                    message:"Bid Amount is greater than the account balance"
                })
             }else{
                 //update bid amount.
                Bid.updateOne({"Owner.user":req.userData.id,product:req.params.id},{$set: {"bidAmount": req.body.bidAmount}})
                .exec()
                .then(result=>{
                    Bid.find({product:req.params.id})
                    .exec()
                    .then(bids=>{
                        const sortedBids = bids.sort((a,b)=>{
                           return b.bidAmount-a.bidAmount;
                        })
                      
                    req.io.to(room).emit("update",{message:sortedBids,biddable:true})
                    return res.status(200).json({
                        message:"Successfullly send the updated bid."
                    })
                })
                })
                
             }

           })
        }else{

            User.find({_id:req.userData.id})
            .exec()
            .then(user=>{
                //Step:2 Check his balance.
            if( user[0].accountBalance< req.body.bidAmount){
                return res.status(401).json({
                    message:"Bid Amount is greater than the account balance"
                })
            }else{
            
                //Step:3 Create a bid object.
                
                    const owner = {
                        user:req.userData.id,
                        username:req.userData.username,
                        phone:req.userData.phone,
                    
                    }
                    const bid = new Bid({
                    _id: new mongoose.Types.ObjectId(),
                        Owner: owner,
                        bidAmount:req.body.bidAmount,
                        product:req.params.id
                    })
                    //Save it in database
                    bid.save()
                    .then(result=>{
                        //Find all bids on a product.
                        Bid.find({product:req.params.id})
                        .exec()
                        .then(bids=>{
                            const sortedBids = bids.sort((a,b)=>{
                                return b.bidAmount-a.bidAmount;
                            })
                            req.io.to(room).emit("update",{message:sortedBids,biddable:true})
                            return res.status(200).json({
                                message:"Successfullly send the bid."
                            })
                        })
                    
                    })
                    .catch(err=>{
                        console.log(err);
                    }) 
                
                }

            })
            .catch(err=>{
                console.log(err);
            })
            

                }

            })
            .catch(err=>{
                console.log(err);
            })
             
})

router.post("/done/:id",checkAuth,(req,res,next)=>{
    //Steps for this purpose
    //Step:1 Update the product by setting biddable to false.
    let room = ''+req.params.id;
   Product.updateOne({_id:req.params.id},{$set: {"biddable": false}})
   .exec()
   .then(product=>{
        //Step:3 Get the user who won the bid.
        Bid.find({product:req.params.id})
        .exec()
        .then(bids=>{
            const sortedBids = bids.sort((a,b)=>{
               return  b.bidAmount-a.bidAmount;
            })
           
           const winnerUser=sortedBids[0].Owner.user;
           console.log(sortedBids[0]);
           //Update the amount in this users account.
            User.find({_id:winnerUser})
           .select("accountBalance")
           .exec()
           .then(user=>{
            const bid = sortedBids[0].bidAmount;
            const balance = user[0].accountBalance;
            const newBalance = balance - bid;
            User.updateOne({_id:winnerUser},{$set: {"accountBalance": newBalance}})
            .exec()
            .then(user=>{
                 //Send a broadcast on the front end.
                
                 req.io.to(room).emit("update",{message:sortedBids,biddable:false})
                 return res.status(200).json({
                     message:"Bid Ended the Winner will be given the product.",
                     
                 })

            })
           })
         
           
        })

   }
   )
    
   
    
   


})






  
module.exports = router;
