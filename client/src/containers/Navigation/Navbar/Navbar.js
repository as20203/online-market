import React, { Component } from 'react'
import './Navbar.css'
import AuthNavbar from './AuthNavbar/AuthNavbar';
import SimpleNavbar from './SimpleNavbar/SimpleNavbar';

class myNav extends Component {
  
  state = {
    isAuthenticated : Boolean(localStorage.getItem("Authentication")),
    shouldUpdate: true
  }
  
  myFunction=() =>{
    var x = document.getElementById("myTopnav");
    window.scrollTo(0,0);
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }

  } 

  logoutHandler = ()=>{
    localStorage.setItem("Authentication","");
    localStorage.setItem("Token","");

    this.setState({isAuthenticated:false,shouldUpdate:true});
   
  }



  

  componentDidUpdate(){
    
    if(Boolean(localStorage.getItem("Authentication")) && (this.state.shouldUpdate)){
     
      this.setState({isAuthenticated:true,shouldUpdate:false});
    }
   

  }

  




  render() {
    
    let header = null;
    
    const tokenInfo = JSON.parse((localStorage.getItem('TokenInfo')));
    
    if(this.state.isAuthenticated){

      if(tokenInfo.type==='Admin'){
        header = <AuthNavbar link='/adminPage' myFunction={this.myFunction} logoutFunction={this.logoutHandler} />;
      }else{
        header = <AuthNavbar link='/' myFunction={this.myFunction} logoutFunction={this.logoutHandler} />;
      }
      
      
      
    }else{
     
      header = <SimpleNavbar myFunction={this.myFunction} />;
    }

   return(
    <div> {header}</div>
     

    
     
    )
  }
}

export default myNav;
