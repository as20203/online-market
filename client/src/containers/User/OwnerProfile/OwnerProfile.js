import React,{Component} from 'react';
import {Card,Image,Grid,Segment,Header,Divider} from 'semantic-ui-react';
import axios from 'axios'
import '../Profile/Profile.css'
import Loader from 'react-loader-spinner'



class OwnerProfile extends Component{
    state = {
        username:'',
        aboutMe:'',
        hobbies:'',
        city:'',
        phone:null,
        imagePath:null,
          
      }

      componentDidMount(){
        window.scrollTo(0,0);
        console.log(this.props.match.params.id);
        axios.get('/user/profile/'+this.props.match.params.id, { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result=>{
                console.log(result);
                this.setState({
                    username:result.data.userData.username,
                    aboutMe:result.data.userData.aboutMe,
                    hobbies:result.data.userData.hobbies,
                    city:result.data.userData.city,
                    phone:result.data.userData.phone,
                    imagePath:result.data.userData.userImage
                });
            
        })
        .catch(error=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
          this.props.history.replace('/login');
        })
      }

    render(){
        if(!this.state.imagePath && !this.state.phone){
            return(
                <div style={{margin:'350px auto',minHeight:'80vh',width:'1.5em'}}>
                <Loader 
                   
                    
                   type="Grid"
                   color="#DFCFBE"
                   height="80"	
                    width="80"
                   
                />  
                </div> 
               );

        }
        

        return(

            <Grid className="profileGrid">
             
            <Grid.Row className="rowPadding">
                <Grid.Column computer={5} tablet={7} mobile={16}>
                   
                        <Card className="profileImgCard">
                            <Image src={this.state.imagePath}  style={{marginTop:"0px"}} />
                            <Card.Content>
                                <Card.Header as='h4' style={{color:'teal'}}>{this.state.username}</Card.Header>
                              
                                
                            </Card.Content>
                          
                        </Card>
                    
                </Grid.Column>
               
                <Grid.Column computer={11} tablet={9} mobile={16}>
                 <Segment raised className="profileSegment">
               
                    <Header className="medium text" as="h1" color={"grey"} textAlign={"left"}>About Owner</Header>
                    <div className="profileContainer1">
                        <p className="small text profileContent">
                       {this.state.aboutMe}

                        </p>
                    </div>
                    <Divider section />
                    <Header className="medium text" as="h1" color={"grey"} textAlign={"left"}>His Hobbies And Interests</Header>
                    
                    <div className="small text profileContainer1"> 
                        <p className="profileContent">
                           {this.state.hobbies}

                        </p>
                    </div>
                    <Divider section />

                     <Header className="medium text" as="h1"color={"grey"} textAlign={"left"}>His City</Header>
                     <div className="small text profileContainer2"> 
                        <p>{this.state.city}</p>
                    </div>
                    <Divider section />

                     <Header className="medium text" as="h1" color={"grey"} textAlign={"left"}>His Phone No:</Header>
                     <div className="small text profileContainer2"> 
                        <p>{this.state.phone}</p>
                    </div>
                    </Segment>

                          
                    
                    
             </Grid.Column>

        </Grid.Row>    




    </Grid>
                   

        )

    }

        
    
}

export default OwnerProfile;