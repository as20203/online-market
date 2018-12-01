import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const ButtonAnimated = (props) =>{
  const link = '/productInfo/'+props.pId;
 
  return(
    <div>
    
    <Button as={Link} to={link} style={{margin:"40px 60px",display:'block'}} animated='fade' color="green">
      <Button.Content hidden>Shop</Button.Content>
      <Button.Content visible>
        <Icon name='dollar' />
      </Button.Content>
    </Button>
    
  </div>

  )
}

export default ButtonAnimated;
