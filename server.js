const express = require('express');
require('./env');
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const seedDB = require('./backend/SeedData/SeedData');
//Routes
const userRoutes = require('./backend/routes/auth');
const productRoutes = require('./backend/routes/products');

const app = express();

const     server = require("http").Server(app);
const      io = require("socket.io")(server);


const timer = 30;
//Connect to database
//Connect to a database
const url = process.env.DATABASEURL || "mongodb://localhost/online-market";
mongoose.connect(url,{ useNewUrlParser: true,useCreateIndex: true, });

seedDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.sockets.on("connection",userSocket=>{
 
  console.log("connected"+userSocket.id);
  
  userSocket.on('myRoom',function(userRoom){
   
    userSocket.join(userRoom.message);
  })


	userSocket.on('createdUser',(message)=>{
    io.sockets.emit("updatedUsers",{update:true})
  });

  userSocket.on('createdProduct',(message)=>{
    io.sockets.emit("updateProduct",{update:true})

  });

  userSocket.on('removedProduct',(message)=>{
    io.sockets.emit('removeProduct',{update:true})
  })
	
	userSocket.on('disconnect', (reason)=> {
       
        console.log('Client disconnected: - '+userSocket.id);
       
    });
});




// Make io accessible to our router
app.use(function(req,res,next){
  req.io = io;
  next();
});


//Use Routes
app.use("/user",userRoutes);
app.use("/products",productRoutes);
app.use('/allUsers',express.static('allUsers'));
app.use('/allProducts',express.static('allProducts'));


//Io Connections





if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}





server.listen(port, () => console.log(`Listening on port ${port}`));