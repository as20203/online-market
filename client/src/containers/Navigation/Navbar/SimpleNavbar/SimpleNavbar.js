import React from 'react'
import { Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import '../Navbar.css'

const simpleNav = (props) =>{
    return(
        <div   >
            <div onClick={props.outsideClick} icon="labeled"  className="topnav" id="myTopnav">
                
    
                <Link to="/"  >
                <Icon name="chart bar" className="myicon"  />IZRAK
                </Link>
            
                
                <Link to='/allTheProducts' name="products" >
                <Icon name="dollar" className="myicon"  />Products
                </Link>
                
    
                <Link to='/signup' name="signup" className="aright">
                <Icon name="user plus" className="myicon"  />SignUp
                </Link>
    
                <Link to='/login'className="aright" name="login">
                <Icon name="user" className="myicon"  />Login
                </Link>
            
                <Link  to={{javascript:void(0)}} style={{boxShadow:"none",transition:"none"}} className="icon"  onClick={props.myFunction}>
                
                <Icon name="bars" className="myicon" />
                </Link>
            </div>
        </div>
  
      
       
      )

}
  

  

export default simpleNav;
