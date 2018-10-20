const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
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
                        email:req.body.email,
                        username:req.body.username,
                        city:req.body.city,
                        phone:req.body.phone,
                        password:hash
                
                    });
        
                    user
                    .save()
                    .then(result=>{
                        console.log(result);
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
            console.log(user);
           return res.status(401).json({
                message:"Auth Failed"
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
                        id:user[0]._id
                       
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







module.exports = router;