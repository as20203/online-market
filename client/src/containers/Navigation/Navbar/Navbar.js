import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import './Navbar.css'

class myNav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted icon='labeled' className="MyNav">
        <Menu.Item 
       
        as={Link} to='/' 
        name='home' 
        active={activeItem === 'home'} 
        onClick={this.handleItemClick}
        >
          <Icon name='home' />
          Home
        </Menu.Item>

        <Menu.Item
          as={Link} to='/'
          name='Products'
          active={activeItem === 'Products'}
          onClick={this.handleItemClick}
          
        >
          <Icon name='dollar sign' />
          Products
        </Menu.Item>

         <Menu.Menu position='right'>
        <Menu.Item
        as={Link} to='/login'
        
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
        >
          <Icon name='user' />
            Login
        </Menu.Item>

        <Menu.Item 
          as={Link} to='/signup'
          name='signUp'
          active={activeItem === 'signUp'}
          onClick={this.handleItemClick}
        >
          <Icon name='user plus' />
            SignUp
        </Menu.Item>

        </Menu.Menu>
       
      </Menu>
    )
  }
}

export default myNav;
