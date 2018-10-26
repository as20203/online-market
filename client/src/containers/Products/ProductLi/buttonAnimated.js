import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ButtonAnimated = () => (
  <div>
    
    <Button animated='fade' color="green">
      <Button.Content hidden>Shop</Button.Content>
      <Button.Content visible>
        <Icon name='dollar' />
      </Button.Content>
    </Button>
    
  </div>
)

export default ButtonAnimated;
