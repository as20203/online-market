const express = require('express');

const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var seedDB = require('./backend/SeedData/SeedData');
//Routes
const userRoutes = require('./backend/routes/auth');



const app = express();


//Connect to database
//Connect to a database
var url = process.env.DATABASEURL || "mongodb://localhost/online-market";
mongoose.connect(url,{ useNewUrlParser: true,useCreateIndex: true, });

seedDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//Use Routes
app.use("/user",userRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}





app.listen(port, () => console.log(`Listening on port ${port}`));