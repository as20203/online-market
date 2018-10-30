import React,{Component} from 'react';
import {Card,Image,Grid,Segment,Header,Container,Divider,Form, Label,Button,Input} from 'semantic-ui-react';
import productImage from '../../../assets/landing-page/accessories/mobile.png';
import './ProductInfo.css'

class Profile extends Component{
    state={
        bidAmount:'0'
    }

    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
         
       
      }



    render(){
        window.scrollTo(0,0);
        return(
           
            <Grid className="productInfoGrid">
                 <Header as="h1" color={"grey"} style={{margin:'0px auto'}} >Current Bid: - ${this.state.bidAmount}</Header>
                <Grid.Row className="rowPadding">
                    <Grid.Column computer={5} tablet={7} mobile={16}>
                       
                            <Card className="profileImgCard">
                                <Image style={{height:'290px'}} src={productImage}  />
                                <Card.Content>
                                    <Card.Header as='h4' style={{color:'teal'}}>A Beautiful Samsung Mobile</Card.Header>
                                    
                                </Card.Content>
                                <Card.Content extra>
                                    
                                        <br/>
                                       
                                </Card.Content>
                            </Card>
                        
                    </Grid.Column>
                   
                    <Grid.Column computer={11} tablet={9} mobile={16}>
                     <Segment raised className="profileSegment" style={{borderRadius:'10px'}}>
                        <Header as="h1" color={"grey"} textAlign={"left"}>Description</Header>
                        <Container >
                            <p className="profileContent">
                            Nunc ut turpis aliquam, condimentum justo sit amet, varius eros. 
                            Nunc malesuada, nunc non rutrum vulputate, nisl ante maximus magna, sit amet suscipit arcu tellus ut nunc. Pellentesque porttitor molestie nisl ut fermentum. Fusce feugiat tortor non turpis aliquet sollicitudin. Nulla finibus nunc in urna euismod, nec vulputate nisl venenatis. Ut mollis sem libero, quis tristique tortor ultricies quis. Morbi tristique purus maximus urna blandit pharetra. Pellentesque lobortis, lacus in faucibus imperdiet, mauris felis iaculis odio, 
                            ac ultricies eros velit nec neque. Morbi a quam 
                            consequat, gravida ante quis, tincidunt nisi.

                            </p>
                        </Container>
                        <Divider section />
                       

                         <Header as="h1"color={"grey"} textAlign={"left"}>Price</Header>
                         <Container > 
                            <p>$20</p>
                        </Container>
                        <Divider section />

                         <Header as="h1" color={"grey"} textAlign={"left"}>Product Owner</Header>
                         <Container > 
                            <p>Jawad Zaheer</p>
                        </Container>
                        <Divider section />
                        <Header as="h1" color={"grey"} textAlign={"left"}>Product Category</Header>
                        <Container > 
                            <p className="profileContent">
                                Accessories
                            </p>
                           
                        </Container>

                         <Divider section />
                        <Header as="h1" color={"grey"} textAlign={"left"}>Bid On this product</Header>
                        <Container > 
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                       
                                        <Input labelPosition='right' name='bidAmount' type='number'  placeholder='Amount' onChange={this.onChange}>
                                            <Label basic>$</Label>
                                            <input min='20' />
                                              <Label>.00</Label>
                                            
                                         </Input>
                                        </Form.Field>

                                     <Form.Field>
                                        <Button color={'teal'} type='submit' className='Button'> Set Bid</Button>
                                    </Form.Field>
                                
                                </Form.Group>

                            </Form>
                           
                           
                        </Container>
                           
                       

                    </Segment>

                          
                    
                    
                    </Grid.Column>
                  
                </Grid.Row>    
                
            
                
               
            </Grid>
          
        )
    }

    
}
   


export default Profile;