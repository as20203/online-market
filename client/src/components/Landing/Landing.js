import React from 'react';
import './Landing.css';
import Reveal from './Reveal/Reveal'
import {Header,Segment,Grid,Container,Divider,Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

//All images of Landing page 
//accessories
import mobile from '../../assets/landing-page/accessories/mobile.png';
import laptop from '../../assets/landing-page/accessories/laptop.png';

//furniture
import bed from '../../assets/landing-page/furniture/bed.png';
import chairs from '../../assets/landing-page/furniture/chairs.png';
import desk from '../../assets/landing-page/furniture/desk.png';
import greendesk from '../../assets/landing-page/furniture/greendesk.png';
import home from '../../assets/landing-page/furniture/home.png';
import shadow from '../../assets/landing-page/furniture/shadow.png';

//random
import car from '../../assets/landing-page/random/car.png'
import bag from '../../assets/landing-page/random/bag.png'
import clothes from '../../assets/landing-page/random/clothes.png'
import oven from '../../assets/landing-page/random/oven.png'
import shoes from '../../assets/landing-page/random/shoes.png'







const landing = ()=>{
         
        
        return(
        
           
          <Container style={{marginTop:"100px",marginBottom:"80px"}}>
            <Header color="teal" textAlign={"center"} as="h1">Welcome To JNS Online-Market</Header>
            <Divider section />
            <Button as={Link} to='/products' style={{width:'200px'}} className="Button" color="grey" >Check Out Our Products</Button>
           
            <Header color="olive" textAlign={"left"}  as="h2">We offer you:</Header>
           
            <Grid style={{marginTop:"20px"}}>
              <Header color="grey" textAlign={"left"} as="h3">Accessories</Header>
                <Grid.Row>
                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                        <Segment color={"grey"}>
                          <Container>
                          <Reveal animated='move up' size="huge" visible={mobile} hidden={laptop} />
                      
                          </Container>
                        </Segment>
                      </Grid.Column>

                      <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                        <Segment color={"grey"}>
                          <Container>
                          <Reveal animated='fade' size="huge" visible={laptop} hidden={mobile} />
                            
                          </Container>
                        </Segment>
                      </Grid.Column>
                 </Grid.Row>

                
                 <Header color="grey"  textAlign={"left"} as="h3">Furniture</Header>
                 <Grid.Row>

                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                      <Segment color={"grey"}>
                        <Container>
                        <Reveal animated='move up' size="huge"visible={bed} hidden={chairs} />
                      
                        </Container>
                      </Segment>
                    </Grid.Column>

                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                      <Segment color={'grey'}>
                              

                            <Grid divided columns={2}>
                                <Grid.Row>
                                  <Grid.Column>
                                  <Reveal animated='move' size="large"visible={home} hidden={shadow} />
                                  </Grid.Column>
                                  <Grid.Column>
                                  <Reveal animated='move' size="large" visible={desk} hidden={greendesk} />
                                  </Grid.Column>
                                  
                                </Grid.Row>

                                
                            </Grid>
                            
                      </Segment>
                  </Grid.Column>
                 </Grid.Row>

                
                <Header color="grey" textAlign={"left"} as="h3">And Much More</Header>
                <Container>
                  <Segment raised color={'grey'}>
                  <Grid divided='vertically'>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                        <Reveal animated='fade'  size="huge"visible={car} hidden={bag} />
                        
                        </Grid.Column>
                        <Grid.Column>
                        <Reveal animated='move up' size="huge"visible={bag} hidden={car} />
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={3}>
                        <Grid.Column>
                            <Reveal animated='fade' size="huge"visible={clothes} hidden={oven} />  
                        </Grid.Column>
                        <Grid.Column>
                            <Reveal animated='move' size="huge"visible={oven} hidden={shoes} />
                        </Grid.Column>
                        <Grid.Column>
                            <Reveal animated='move' size="huge"visible={shoes} hidden={clothes} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Container>


          
            </Grid>
          </Container>
           
       
       
      
   
      );

}

export default landing;