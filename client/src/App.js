import React, { Component } from 'react';
import Profile from './containers/User/Profile/Profile'
import {BrowserRouter as Router,Route} from 'react-router-dom'; 
import Login from './containers/Authentication/Login/Login';
import Signup from './containers/Authentication/Signup/Signup';
import Navbar from './containers/Navigation/Navbar/Navbar';
import Landing from './containers/Landing/Landing';
import Product from './containers/Products/Products';
import Footer from './components/Footer/Footer';
import CreateProduct from './containers/Product/Product';
import Editprofile from './containers/User/Profile/EditProfile/EditProfile';
import productInfo from './containers/Products/ProductInfo/ProductInfo';
import adminPage from './containers/Admin/Admin';
import OwnerProfile from './containers/User/OwnerProfile/OwnerProfile'
import './App.css'
import Particles from 'react-particles-js';

const particleOpt = {
          particles: {
              number:{
                value:150,
                density:{
                  enable:true,
                  value_area: 800
                }
              },
              move:{
                direction: "none" ,
                speed:0.5
              },
              line_linked:{
                enable:true

              },
          

          }
}

class App extends Component {
 
  render() {
    
   
    return (
      <Router>
      <div>
       <Navbar />
      
       <Particles 
              params={particleOpt}
              style={{
                width: '100%',
                position:"fixed"
              }}
            />


      
      
        <Route exact path="/"  component={Landing} />
        <Route path='/productInfo/:id' component={productInfo} />
        <Route path='/adminPage' component={adminPage} />
        <Route path="/createProduct" component={CreateProduct} />
        <Route path='/editProfile'  component={Editprofile} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup}/>
        <Route path="/allTheProducts" component={Product} />
        <Route path="/ownerProfile/:id" component={OwnerProfile} />




      <Footer />
     
      </div>

     
      </Router>
    );
  }
}

export default App;
