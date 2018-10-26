import React from 'react'
import { Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import '../SimpleNavbar/SimpleNavbar.css'

const simpleNav = (props) =>{
    return(
        <div icon="labeled"  className="topnav" id="myTopnav">
            
  
            <Link to="/"  >
            <Icon name="home" className="myicon"  />Home
            </Link>
           
            <Link to='/profile' name="user">
                <Icon name="user" className="myicon"  />
                Profile
            </Link>

             <Link to='/products' name="user">
                <Icon name="dollar" className="myicon"  />
                Products
            </Link>



            <Link to='/createProduct' name="createproduct">
                <Icon name="dollar" className="myicon"  />
                Create Product
            </Link>

            

            <Link to='/' name="signout" className="aright" onClick={props.logoutFunction}>
                <Icon name="log out" className="myicon"  />Sign Out
            </Link>
  
            
            <Link  to={{javascript:void(0)}} style={{boxShadow:"none"}} className="icon" onClick={props.myFunction}>
            
                <Icon name="bars" className="myicon" />
            </Link>
        </div>
  
      
       
      )

}
  

  

export default simpleNav;
