import React,{Component} from 'react';
import {Button,Form,Segment,Header} from 'semantic-ui-react';
import './EditProfile.css';
import axios from 'axios';

class EditProfile extends Component{

    state={
        aboutMe:'',
        hobbies:''
        

    }




  

    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
      }

      
      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        
        const userInfo = this.state;
        axios.post("/user/editProfile",userInfo,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result=>{
           if(result.status===200){

               this.props.history.push('/profile');
           }
        })
        .catch(error=>{
            console.log(error);
        })
        
    
      }
      componentDidMount(){
        axios.get("/user/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(()=>{
            window.scrollTo(0,0);
            
        })
        .catch(error=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.push("/login");

        })
      }
    

    render(){
       
        return(
                
                <Segment stacked className="EditProfile" >
                    
                    <Header color={"grey"} as="h1">Edit Profile</Header>
                    <Form onSubmit={this.onSubmit}>
                           
                            <Form.Field>
                                <label>About Me:</label>           
                                <textarea  required name="aboutMe" placeholder="Write About Your Schooling,Interests etc."  onChange={this.onChange} />
                            </Form.Field>

                            <Form.Field >
                                <label>Hobbies And Interest:</label>           
                                <textarea required  name="hobbies" placeholder="Write about your hobbies and Interests"  onChange={this.onChange} />
                            </Form.Field>

                           

                           
                
                            <Button  secondary className="Button" type='submit'>Edit</Button>
                        </Form>
                        
                </Segment>

     

           
           
           
    
    );

    }
}


export default EditProfile;