import React,{Component} from 'react';
import {Input,Button,Card,Image,Grid,Segment,Header,Container,Divider,Form} from 'semantic-ui-react';
import './Profile.css'
import axios from 'axios'
import {Link} from 'react-router-dom';
import ProductLi from '../../Products/ProductLi/ProductLi';
import bed from '../../../assets/landing-page/furniture/bed.png';
import chairs from '../../../assets/landing-page/furniture/chairs.png';




class Profile extends Component{
    state = {
      username:'',
      aboutMe:'',
      hobbies:'',
      city:'',
      phone:'',
      image:null,
      imagePath:''
        
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const fd = new FormData();
       
        fd.append('image',this.state.image,this.state.image.name);
       

        axios.post('/user/profileImage',fd,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result=>{

            axios.get('/user/profile', { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(result=>{
                    
              
                   
                    window.scrollTo(0,0);
                    this.setState({
                       
                        imagePath:result.data.userData.userImage
        
                    });
                
            }
    
            )
            .catch(error=>{
                localStorage.removeItem("TokenInfo");
                localStorage.removeItem("Authentication");
              this.props.history.replace('/login');
            })

            
        })
        .catch(error=>{
            console.log(error);
        })
    }

    fileSelectHandler = (event) =>{
       
        this.setState({
            image:event.target.files[0]
        })
      
    }

    componentDidMount(){
        if(localStorage.getItem("Token")){
            
            axios.get('/user/profile', { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(result=>{
                    
              
                  
                    window.scrollTo(0,0);
                    this.setState({
                        username:result.data.userData.username,
                        aboutMe:result.data.userData.aboutMe,
                        hobbies:result.data.userData.hobbies,
                        city:result.data.userData.city,
                        phone:result.data.userData.phone,
                        imagePath:result.data.userData.userImage
        
                    });
                
            }
    
            )
            .catch(error=>{
                localStorage.removeItem("TokenInfo");
                localStorage.removeItem("Authentication");
              this.props.history.replace('/login');
            })

        }else{
            this.props.history.replace('/login');
          
          
        }
      
       
       
      }
    render(){
       
        return(
           
            <Grid className="profileGrid">
             
                <Grid.Row className="rowPadding">
                    <Grid.Column computer={5} tablet={7} mobile={16}>
                       
                            <Card className="profileImgCard">
                                <Image src={this.state.imagePath}  style={{marginTop:"0px"}} />
                                <Card.Content>
                                    <Card.Header as='h4' style={{color:'teal'}}>{this.state.username}</Card.Header>
                                    
                                </Card.Content>
                                <Card.Content extra>
                                <Form onSubmit={this.onSubmit}>
                                    <Input type="file" className="userImage" name="image" onChange={this.fileSelectHandler} /> 
                                        <br/>
                                        <Button type="submit"   color="blue" className="profileButton">Upload Image</Button>
                                </Form>

                                </Card.Content>
                            </Card>
                        
                    </Grid.Column>
                   
                    <Grid.Column computer={11} tablet={9} mobile={16}>
                     <Segment raised className="profileSegment">
                     <Button  as={Link} to='/editProfile' className="profileButton" style={{width:'180px'}} color="teal" >Edit Profile</Button>
                        <Header as="h1" color={"grey"} textAlign={"left"}>About Me</Header>
                        <Container className="profileContainer1">
                            <p className="profileContent">
                           {this.state.aboutMe}

                            </p>
                        </Container>
                        <Divider section />
                        <Header as="h1" color={"grey"} textAlign={"left"}>My Hobbies And Interests</Header>
                        
                        <Container className="profileContainer1"> 
                            <p className="profileContent">
                               {this.state.hobbies}

                            </p>
                        </Container>
                        <Divider section />

                         <Header as="h1"color={"grey"} textAlign={"left"}>City</Header>
                         <Container className="profileContainer2"> 
                            <p>{this.state.city}</p>
                        </Container>
                        <Divider section />

                         <Header as="h1" color={"grey"} textAlign={"left"}>Phone No:</Header>
                         <Container className="profileContainer2"> 
                            <p>{this.state.phone}</p>
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