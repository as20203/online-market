const express = require('express');

const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Routes
const userRoutes = require('./backend/routes/auth');



const app = express();


//Connect to database
//Connect to a database
var url = process.env.DATABASEURL || "mongodb://localhost/online-market";
mongoose.connect(url,{ useNewUrlParser: true,useCreateIndex: true, });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//Use Routes
app.use("/user",userRoutes);





app.listen(port, () => console.log(`Listening on port ${port}`));