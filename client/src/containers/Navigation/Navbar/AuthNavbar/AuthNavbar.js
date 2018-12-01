import React from 'react'
import { Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import '../SimpleNavbar/SimpleNavbar.css'

const simpleNav = (props) =>{
    let link = null;
    if(props.type!=='admin'){
        link  = <Link to='/createProduct' name="user">
        <Icon name="dollar" className="myicon"  />
       Create Product
    </Link>
    }
    return(
        <div icon="labeled"  className="topnav" id="myTopnav">
            
  
            <Link to={props.link}  >
            <Icon name="home" className="myicon"  />Home
            </Link>
           
            <Link to='/profile' name="user">
                <Icon name="user" className="myicon"  />
                Profile
            </Link>

             <Link to='/Allproducts' name="user">
                <Icon name="dollar" className="myicon"  />
                Products
            </Link>
            
            {link}


            

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
