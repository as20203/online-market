import React, {Component} from 'react'
import { Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import '../Navbar.css';
import onClickOutside from 'react-click-outside';

class SimpleNav extends Component{
    state={
        toggle:false
    }

    handleClickOutside = () => {
        if(this.state.toggle){
            this.props.myFunction();
            this.setState({
                toggle:false
            })

        }
       
      }

      handleToggle = () =>{
          this.props.myFunction();
          this.setState(prevState=>({
            toggle:!prevState.toggle
        }))
      }
      

    render(){

        return(
            <div   >
                <div  icon="labeled"  className="topnav" id="myTopnav">
                    
        
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
                
                    <Link  to={{javascript:void(0)}} style={{boxShadow:"none",transition:"none"}} className="icon"  onClick={this.handleToggle}>
                    
                    <Icon name="bars" className="myicon" />
                    </Link>
                </div>
            </div>
      
          
           
          )
    

    }
}



export default onClickOutside(SimpleNav);
