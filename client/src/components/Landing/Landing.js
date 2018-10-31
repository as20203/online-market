import React from 'react';
import './Landing.css';
import Reveal from './Reveal/Reveal'
import {Header,Segment,Grid,Container,Divider,Button,Message,Icon} from 'semantic-ui-react';
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

//random
import car from '../../assets/landing-page/random/car.png'
import bag from '../../assets/landing-page/random/bag.png'
import clothes from '../../assets/landing-page/random/clothes.png'
import newClothes from '../../assets/landing-page/random/oven.png'
import shoes from '../../assets/landing-page/random/shoes.png'

//transitions
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';






const landing = (props)=>{
  window.scrollTo(0,0);
        return(
         
        
        <Grid className="LandingGrid">
         <Container style={{marginTop:"150px",marginBottom:"80px"}} >
            <Segment >
         

          <ReactCSSTransitionGroup   
              transitionName="example"          
              transitionAppear={true}
              transitionAppearTimeout={2000}
             transitionEnter= {false}
              transitionLeave={false}>

           <Message icon key='hello' style={{color:'brown'}}>
              <Icon name='hand peace'/>
               <Message.Content>
                <Message.Header className='landingHeader'>Welcome To IZRAK online Market</Message.Header>
                Get the best products for the cheapest price.
              </Message.Content>
          
           </Message> 
        

           </ReactCSSTransitionGroup> 
       
            {/* <Header color="teal" textAlign={"center"} as="h1">Welcome To JNS Online-Market</Header> */}
            <Divider section />
            <Button as={Link} to='/products' style={{width:'200px'}} className="Button" color="grey" >Check Out Our Products</Button>
           
            <Header color="olive" textAlign={"left"}  as="h2">We offer you:</Header>
           
            <Grid style={{marginTop:"20px"}}>
              <Header color="blue" textAlign={"left"} as="h3">Accessories</Header>
                <Grid.Row>
               
              
                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                    
                    <Segment color={"grey"} style={{margin:"10px auto"}}> 
                      
                          <Reveal animated='fade' size="large"  visible={laptop} hidden={mobile}/>
                         
                    </Segment> 
                      
                      </Grid.Column>
                
               
               
                    

                    
                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                    
                    <Segment color={"grey"} style={{margin:"10px auto"}}>    
                     <Reveal animated='fade' size="large"  visible={mobile} hidden={laptop}/>
                      
                    </Segment>
                      
                      </Grid.Column>
                   
                 </Grid.Row>

                
                 <Header color="blue"  textAlign={"left"} as="h3">Furniture</Header>
                 <Grid.Row>

                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                      <Segment style={{height:'100%'}} color={"grey"}>
                      
                        <Reveal animated='move up' size="huge"visible={bed} hidden={chairs} />
                      
                      
                      </Segment>
                    </Grid.Column>

                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                      <Segment color={'grey'}>
                              

                            <Grid divided columns={2}>
                                <Grid.Row>
                                  <Grid.Column>
                                  <Reveal animated='move' size="medium"visible={home} hidden={desk} />
                                  </Grid.Column>
                                  <Grid.Column>
                                  <Reveal animated='move' size="medium" visible={desk} hidden={greendesk} />
                                  </Grid.Column>
                                  
                                </Grid.Row>

                                
                            </Grid>
                            
                      </Segment>
                  </Grid.Column>
                 </Grid.Row>

                
                <Header color="blue" textAlign={"left"} as="h3">And Much More</Header>
                <Container>
                  <Segment raised color={'grey'}>
                  <Grid divided='vertically'>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                        <Reveal animated='fade'  size="huge"visible={car} hidden={bag} />
                        
                        </Grid.Column>
                        <Grid.Column>
                        <Reveal animated='fade' size="huge"visible={bag} hidden={car} />
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={3}>
                        <Grid.Column>
                            <Reveal animated='fade' size="huge"visible={clothes} hidden={newClothes} />  
                        </Grid.Column>
                        <Grid.Column>
                            <Reveal animated='fade' size="huge"visible={newClothes} hidden={shoes} />
                        </Grid.Column>
                        <Grid.Column>
                            <Reveal animated='fade' size="huge"visible={shoes} hidden={clothes} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Container>


          
            </Grid>

         
          </Segment>
          </Container>
          
          </Grid>
      
   
      );

}

export default landing;