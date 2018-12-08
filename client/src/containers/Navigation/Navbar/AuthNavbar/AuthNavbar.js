import React,{Component} from 'react'
import { Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import onClickOutside from 'react-click-outside';
import '../Navbar.css'

class AuthNavbar extends Component{
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
        let link = null;
        if(this.props.type!=='admin'){
            link  = <Link to='/createProduct' name="user">
            <Icon name="dollar" className="myicon"  />
           Create Product
        </Link>
        }

        return(
            <div icon="labeled"  className="topnav" id="myTopnav">
                
      
                <Link to={this.props.link}  >
                <Icon name="chart bar" className="myicon"  />IZRAK
                </Link>
               
                <Link to='/profile' name="user">
                    <Icon name="user" className="myicon"  />
                    Profile
                </Link>
    
                 <Link to='/allTheProducts' name="user">
                    <Icon name="dollar" className="myicon"  />
                    Products
                </Link>
                
                {link}
    
    
                
    
                <Link to='/' name="signout" className="aright" onClick={this.props.logoutFunction}>
                    <Icon name="log out" className="myicon"  />Sign Out
                </Link>
      
                
                <Link  to={{javascript:void(0)}} style={{boxShadow:"none"}} className="icon" onClick={this.handleToggle}>
                
                    <Icon name="bars" className="myicon" />
                </Link>
            </div>
      
          
           
          )

    }

}

export default  onClickOutside(AuthNavbar);
