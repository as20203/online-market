const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');
const Product = require('../models/product');





router.post("/", checkAuth, (req, res, next) => {

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    user:req.userData.id,
    name: req.body.productname,
    amount:req.body.amount,
   description:req.body.description,
   image:req.body.image,
   category:req.body.category

  
});
  
    product
      .save()
      .then(result => {
        console.log(result);
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
  });

  
module.exports = router;
