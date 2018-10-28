var mongoose = require('mongoose');
var User = require('../models/user');
const bcrypt = require('bcrypt');
var data = [
    
        {
        userType: 'Client',
        email: 'jzahee123@gmail.com',
        username: 'as20203',
        city: 'Rawalpindi',
        phone: '03324453365',
        password: '123456',
    },

    {
        userType: 'Client',
       
        email: 'jawadzaheer@ymail.com',
        username: 'jawad',
        city: 'Rawalpindi',
        phone: '03324453365',
        password: '123',
 },
 {
    userType: 'Client',
   
    email: 'jawadzaheer@ymail.com',
    username: 'ali',
    city: 'Rawalpindi',
    phone: '03324453365',
    password: '123',
},
{
    userType: 'Client',
    email: 'noshi123@gmail.com',
    username: 'noshi',
    city: 'Rawalpindi',
    phone: '03324453365',
    password: '123',
},
{
    userType: 'Admin',
    email: 'admin123@gmail.com',
    username: 'Nosherwan',
    city: 'Rawalpindi',
    phone: '03324453365',
    password: '123',
}


];


function seedDB(){
    User.deleteMany({},err=>{
        if(err){
            console.log(err);
        }else{
            console.log('removed all users');
            data.forEach(function(seed){
                bcrypt.hash(seed.password,10,(err,hash)=>{
                    if(err){
                       console.log(err);
                    }else{
                    var newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email:seed.email,
                        username:seed.username,
                        city:seed.city,
                        phone:seed.phone,
                        userType:seed.userType,
                        password:hash
                    });
                    newUser
                    .save()
                    .then(result=>{
                        console.log(result);
                       
                    })
                    .catch(err=>{
                        console.log(err);
                      
                    }); 
                }                   
            }) 
        
            
        
        })
    }
});
}

module.exports = seedDB;