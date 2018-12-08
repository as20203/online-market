const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require('multer');


cloudinary.config({
     
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET,
  
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'online-market',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
      
      cb(undefined, file.originalname);
    }
  });



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

module.exports = upload;