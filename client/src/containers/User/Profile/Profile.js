import React,{Component} from 'react';
import {Input,Button,Card,Image,Grid,Segment,Header,Container,Divider} from 'semantic-ui-react';
import './Profile.css'
import userImage from '../../../assets/user-empty/empty-user.png'
import {Link} from 'react-router-dom';
import ProductLi from '../../Products/ProductLi/ProductLi';
import bed from '../../../assets/landing-page/furniture/bed.png';
import chairs from '../../../assets/landing-page/furniture/chairs.png';

class Profile extends Component{
    render(){
        window.scrollTo(0,0);
        return(
           
            <Grid className="profileGrid">
             
                <Grid.Row className="rowPadding">
                    <Grid.Column computer={5} tablet={7} mobile={16}>
                       
                            <Card className="profileImgCard">
                                <Image src={userImage} style={{marginTop:"0px"}} />
                                <Card.Content>
                                    <Card.Header as='h4' style={{color:'teal'}}>Jawad Zaheer</Card.Header>
                                    
                                </Card.Content>
                                <Card.Content extra>
                                    <Input type="file" className="userImage" /> 
                                        <br/>
                                        <Button   color="blue" className="profileButton">Upload Image</Button>
                                </Card.Content>
                            </Card>
                        
                    </Grid.Column>
                   
                    <Grid.Column computer={11} tablet={9} mobile={16}>
                     <Segment raised className="profileSegment">
                     <Button  as={Link} to='/editProfile' className="profileButton" style={{width:'180px'}} color="teal" >Edit Profile</Button>
                        <Header as="h1" color={"grey"} textAlign={"left"}>About Me</Header>
                        <Container className="profileContainer1">
                            <p className="profileContent">
                            Nunc ut turpis aliquam, condimentum justo sit amet, varius eros. 
                            Nunc malesuada, nunc non rutrum vulputate, nisl ante maximus magna, sit amet suscipit arcu tellus ut nunc. Pellentesque porttitor molestie nisl ut fermentum. Fusce feugiat tortor non turpis aliquet sollicitudin. Nulla finibus nunc in urna euismod, nec vulputate nisl venenatis. Ut mollis sem libero, quis tristique tortor ultricies quis. Morbi tristique purus maximus urna blandit pharetra. Pellentesque lobortis, lacus in faucibus imperdiet, mauris felis iaculis odio, 
                            ac ultricies eros velit nec neque. Morbi a quam 
                            consequat, gravida ante quis, tincidunt nisi.

                            </p>
                        </Container>
                        <Divider section />
                        <Header as="h1" color={"grey"} textAlign={"left"}>My Hobbies And Interests</Header>
                        
                        <Container className="profileContainer1"> 
                            <p className="profileContent">
                                Nunc ut turpis aliquam, condimentum justo sit amet, varius eros. 
                                Nunc malesuada, nunc non rutrum vulputate, nisl ante maximus magna, sit amet suscipit arcu tellus ut nunc. Pellentesque porttitor molestie nisl ut fermentum. Fusce feugiat tortor non turpis aliquet sollicitudin. Nulla finibus nunc in urna euismod, nec vulputate nisl venenatis. Ut mollis sem libero, quis tristique tortor ultricies quis. Morbi tristique purus maximus urna blandit pharetra. Pellentesque lobortis, lacus in faucibus imperdiet, mauris felis iaculis odio, 
                                ac ultricies eros velit nec neque. Morbi a quam 
                                consequat, gravida ante quis, tincidunt nisi.

                            </p>
                        </Container>
                        <Divider section />

                         <Header as="h1"color={"grey"} textAlign={"left"}>City</Header>
                         <Container className="profileContainer2"> 
                            <p>Rawalpindi,Pakistan</p>
                        </Container>
                        <Divider section />

                         <Header as="h1" color={"grey"} textAlign={"left"}>Phone No:</Header>
                         <Container className="profileContainer2"> 
                            <p>03324453365</p>
                        </Container>
                        <Divider section />
                        <Header as="h1" color={"grey"} textAlign={"left"}>My Products:</Header>
                        <Container className="profileContainer1"> 

                        <Grid>
                
                            <Grid.Column computer={8} tablet={16} mobile={16}>
                            <ProductLi imageSrc={bed} />
                            </Grid.Column>

                            <Grid.Column computer={8} tablet={16} mobile={16}>
                                <ProductLi imageSrc={chairs} />
                            </Grid.Column>


                          
                      </Grid>

                           
                        </Container>
                           
                       

                    </Segment>

                          
                    
                    
                    </Grid.Column>
                  
                </Grid.Row>    
                
            
                
               
            </Grid>
          
        )
    }

    
}
   


export default Profile;