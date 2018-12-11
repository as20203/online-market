import React,{Component} from 'react';
import './Landing.css';
import Reveal from '../../components/Reveal/Reveal'
import {Header,Segment,Grid,Container,Divider,Button,Message,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



   //All images sources.
   const mobile = 'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218423/landing-page/mobile.jpg';
   const laptop =  'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218423/landing-page/laptop.jpg';
   const bed =   'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218424/landing-page/bed.jpg';
   const chairs = 'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218422/landing-page/chairs.jpg';
   const desk =  'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218421/landing-page/desk.jpg';
   const greendesk =  'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218421/landing-page/greendesk.jpg';
   const home = 'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218426/landing-page/home.jpg';
   const car = 'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218425/landing-page/car.jpg';
   const bag = 'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218427/landing-page/bag.jpg';
   const clothes = 'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218426/landing-page/clothes.jpg';
   const newClothes =  'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218427/landing-page/oven.jpg';
   const shoes = 'https://res.cloudinary.com/https-online-market-js-herokuapp-com/image/upload/v1544218425/landing-page/shoes.jpg';


class landing extends Component{
  state = {
    loading:true
  }

    componentDidMount(){
          window.scrollTo(0,0);
          this.Interval = setTimeout(()=>{this.setState({loading:false})},2800)
        }

      componentWillUnmount(){
        clearInterval(this.Interval);
      }


    render(){
        
        if(this.state.loading){
          return(
            <div style={{margin:'350px auto',minHeight:'80vh',width:'1.5em'}}>
            <Loader 
                className="loader"
                
              type="Grid"
              color="#DFCFBE"
              height="80"	
              width="80"
              
            />  
            </div> 
          );

        }
     
        return(
         
        
        <Grid className="LandingGrid">
         <Container style={{marginTop:"150px",marginBottom:"80px",overflow:'hidden'}} >
            <Segment style={{border:'2px solid cadetblue',borderRadius:'20px'}} >
         

          <ReactCSSTransitionGroup   
              transitionName="example"          
              transitionAppear={true}
              transitionAppearTimeout={2000}
             transitionEnter= {false}
              transitionLeave={false}>

           <Message icon key='hello' style={{color:'brown'}}>
              <Icon name='hand peace'/>
               <Message.Content >
                <Message.Header    className='landingHeader'>Welcome To IZRAK Online Market</Message.Header>
                Get the best products for the cheapest price.
              </Message.Content>
          
           </Message> 
        

           </ReactCSSTransitionGroup> 
       
            {/* <Header color="teal" textAlign={"center"} as="h1">Welcome To JNS Online-Market</Header> */}
            <Divider section />
            <Button as={Link} size={"medium"} to='/allTheProducts' style={{width:'200px'}} className="Button" color="teal" >Check Out Our Products</Button>
           
           
           
            <Grid style={{marginTop:"20px"}}>
              <Header color="grey" className="medium text" textAlign={"left"} as="h3">Get Accessories</Header>
                <Grid.Row>
               
              
                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                    
                    <Segment  style={{margin:"10px auto",border:'2px solid cadetblue',borderRadius:'20px'}}> 
                      
                          <Reveal animated='fade' size="large"  visible={laptop} hidden={mobile}/>
                         
                    </Segment> 
                      
                      </Grid.Column>
                
               
               
                    

                    
                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                    
                    <Segment  style={{margin:"10px auto",border:'2px solid cadetblue',borderRadius:'20px'}}>    
                     <Reveal animated='fade' size="large"  visible={mobile} hidden={laptop}/>
                      
                    </Segment>
                      
                      </Grid.Column>
                   
                 </Grid.Row>

                
                 <Header color="grey" className="medium text"  textAlign={"left"} as="h3">Get Furniture</Header>
                 <Grid.Row>

                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                      <Segment style={{height:'100%',border:'2px solid cadetblue',borderRadius:'20px'}} >
                      
                        <Reveal animated='move up' size="huge"visible={bed} hidden={chairs} />
                      
                      
                      </Segment>
                    </Grid.Column>

                    <Grid.Column className="gridColumn" computer={8} tablet={8} mobile={16}>
                      <Segment style={{border:'2px solid cadetblue',borderRadius:'20px'}}>
                              

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

                
                <Header color="grey" className="medium text" textAlign={"left"} as="h3">And Much More</Header>
                <Container style={{marginBottom:'20px'}} >
                  <Segment raised style={{border:'2px solid cadetblue',borderRadius:'20px'}}>
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
  
}

export default landing;