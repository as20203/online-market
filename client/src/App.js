import React, { Component } from 'react';
import Profile from './containers/User/Profile/Profile'
import {BrowserRouter as Router,Route} from 'react-router-dom'; 
import Login from './containers/Authentication/Login/Login';
import Signup from './containers/Authentication/Signup/Signup';
import Navbar from './containers/Navigation/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Product from './containers/Products/Products'


class App extends Component {
 
  render() {
    return (
      <Router>
      <div>
    
       <Navbar />
      
      
       <Route exact path="/"  render={()=><Landing    />} />
       
       <Route path="/profile" component={Profile} />
       <Route path="/login" component={Login} />
       <Route path="/signup" component={Signup}/>
       <Route path="/products" component={Product} />
       
      </div>



      </Router>
    );
  }
}

export default App;
