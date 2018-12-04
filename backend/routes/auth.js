const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const Product = require('../models/product');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'online-users',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
      
      cb(undefined, file.originalname);
    }
  });

  cloudinary.config({
     
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET,
  
});


const fileFilter = (req,file,cb) =>{
    if(file.mimetype ==='image/png' || file.mimetype==='image/jpeg'){
        cb(null,true);
    }else{
       req.error = "We accept only jpeg or png file types."
        cb(null,false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
    fileSize:1024*1024*6
    },
    fileFilter:fileFilter,
   
})
const User = require('../models/user');

router.get("/",checkAuth,(req,res,next)=>{
  
    User.find({userType:"Client"})
    
    .exec()
    .then(users=>{
        var allUsers = [];
        users.forEach(user=>{
            allUsers.push(
                {
                id:user.id,
                username:user.username
                 }
            )
        })
        return res.status(200).json({
            allUsers:allUsers
        });
    })
})
//Sign up Route
router.post('/register',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        
        if(user.length>=1){
            return res.status(420).json({
                message:"Username Exists"
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
        
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username:req.body.username,
                        city:req.body.city,
                        phone:req.body.phone,
                        password:hash
                       
                
                    });
        
                    user
                    .save()
                    .then(result=>{
                       
                        res.status(201).json({
                            message:'User Created'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });                    
                }
            })
        }
    }
    )
});

router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1){
           
           return res.status(401).json({
                message:"Auth Failed."
            });
        }else{
           
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"Auth Failed"
                    });
                }
                if(result){
               
                   const token =  jwt.sign({
                      
                        username:user[0].username,
                        id:user[0]._id,
                        type: user[0].userType,
                        phone:user[0].phone,
                        balance:user[0].accountBalance
                       
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn:"1h"
                    }

                    )
                    return res.status(200).json({
                        message:"Auth Successful",
                        token:token
                    },)
                }

                return res.status(401).json({
                    message:"Auth Failed"
                });


            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
    
})

router.get('/profile',checkAuth,(req,res,next)=>{
    
    //Find all users products.
    Product.find({"Owner.user":req.userData.id})
    .exec()
    .then(products=>{
       
        const response ={
            products: products.map(product => {
                return {
                   
                    name: product.name,
                    description:product.description,
                    productImage: product.image,
                    _id: product._id,
                  
                };
            })
        };

        //Find all products where user won the bid.
        Product.find({"winner.username":req.userData.username})
        .select('name _id winner received')
        .exec()
        .then(products=>{
            let wonProducts = null;
            if(products.length>=1){
                 wonProducts ={
                    products: products.map(product => {
                        return {
                           
                            name: product.name,
                            _id: product._id,
                            winner:product.winner,
                            received:product.received
                          
                        };
                    })
                };
    

            }else{
                wonProducts = [];
            }
           //Get all the user data.
            User.find({_id:req.userData.id})
            .exec()
            .then(user=>{
           
            newUser = {
                username:user[0].username,
                aboutMe:user[0].aboutMe,
                hobbies:user[0].hobbies,
                city:user[0].city,
                phone:user[0].phone,
                userImage:user[0].userImage,
                balance:user[0].accountBalance,
                type:user[0].userType
            }
           
            
            return res.status(201).json({
                userData:newUser,
                products:response,
                wonProducts:wonProducts
            })
    
            })
            .catch(err=>{
                res.status(500).json({
                error:err
            })
        })

        })
        .catch(err=>{
            res.status(500).json({
            error:err
        })

        })


       
        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })

    })
    

    
    

});


router.get("/profile/:id",checkAuth,(req,res,next)=>{
    //Find the user by id and return his/her data
    User.find({_id:req.params.id})
    .select("username aboutMe hobbies city phone userImage")
    .exec()
    .then(user=>{
        console.log(user[0]);
        return res.status(201).json({
            userData:user[0]
        })
    })
    .catch(err=>{
        return res.status(500).json({
            error:err
        })
    })
})

router.post('/editProfile',checkAuth,(req,res,next)=>{
    User.updateOne({_id:req.userData.id},req.body)
    .exec()
    .then(doc=>{
       

        return res.status(200).json({
            message:"Successful"
        })

    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.post('/profileImage',upload.single('image'),checkAuth,(req,res,next)=>{
    //File isn't png or jpg.
    if(req.error){
        return res.status(401).json({
            message:req.error
        })
    }
   
   
   User.updateOne({_id:req.userData.id},{$set: {"userImage": req.file.secure_url}})
   .exec()
   .then(doc=>{
      
       return res.status(200).json({
           message:"Upload Successful"
       })
   })
   .catch(err=>{
    res.status(500).json({
        error:err
    })
})
})

router.delete("/:id", checkAuth, (req, res, next) => {

    const id = req.params.id;
   
    User.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch(err => {
      
      res.status(500).json({
        error: err
      });
    });
});








router.get("/middleware",checkAuth,(req,res,next)=>{
    return res.status(200).json({
        message:"Successfully Authorized",
        userData: req.userData
    })
})






module.exports = router;