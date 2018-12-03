var mongoose = require('mongoose');
var User= require('../models/user');
const bcrypt = require('bcrypt');
var data = [
    
        {
        userType: 'Client',
       
        username: 'as20203',
        city: 'Rawalpindi',
        phone: '03324453365',
        password: '123456',
    
    },

    {
        userType: 'Client',
       
      
        username: 'jawad',
        city: 'Rawalpindi',
        phone: '03324453367',
        password: '123',
 },
 {
    userType: 'Client',
   
    
    username: 'ali',
    city: 'Rawalpindi',
    phone: '03324453321',
    password: '123',
},
{
    userType: 'Client',
   
    username: 'noshi',
    city: 'Rawalpindi',
    phone: '03324453369',
    password: '123',
},
{
    userType: 'Admin',
   
    username: 'Nosherwan',
    city: 'Rawalpindi',
    phone: '03324453361',
    password: '123',
}


];


function seedDB(){
    User.find({})
    .exec()
    .then(users=>{
        if(users.length>=1){
           
            return;
        }else{
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
    }
        
    )
        
    

}

module.exports = seedDB;