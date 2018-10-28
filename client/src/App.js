import React, { Component } from 'react';
import Profile from './containers/User/Profile/Profile'
import {BrowserRouter as Router,Route} from 'react-router-dom'; 
import Login from './containers/Authentication/Login/Login';
import Signup from './containers/Authentication/Signup/Signup';
import Navbar from './containers/Navigation/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Product from './containers/Products/Products';
import Footer from './components/Footer/Footer';
import createProduct from './containers/Product/Product';
import Editprofile from './containers/User/Profile/EditProfile/EditProfile';
import productInfo from './containers/Products/ProductInfo/ProductInfo';
import adminPage from './containers/Admin/Admin';

class App extends Component {
 
  
 
  render() {
    return (
      <Router>
      <div style={{height:"100%"}}>
    
       <Navbar />
      
      
       <Route exact path="/"  render={()=><Landing visit={this.landingPageVisit}     />} />
       <Route path='/productInfo' component={productInfo} />
       <Route path='/adminPage' component={adminPage} />
       <Route path='/editProfile'  component={Editprofile} />
       <Route path="/createProduct" component={createProduct} />
       <Route path="/profile" component={Profile} />
       <Route path="/login" component={Login} />
       <Route path="/signup" component={Signup}/>
       <Route path="/products" component={Product} />




      <Footer />
       
      </div>

     
      </Router>
    );
  }
}

export default App;
