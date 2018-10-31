import React,{Component} from 'react';
import {Button,Form,Segment,Header} from 'semantic-ui-react';
import './EditProfile.css';

class EditProfile extends Component{

    state={
        description:'',
        hobbies:''
        

    }


  

    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
      }

      
      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        
        const newProduct = this.state;
        
       console.log(newProduct);
      }
    

    render(){
       
        return(
                
                <Segment stacked className="EditProfile" >
                    
                    <Header color={"grey"} as="h1">Edit Profile</Header>
                    <Form onSubmit={this.onSubmit}>
                           
                            <Form.Field>
                                <label>About Me:</label>           
                                <textarea  required name="description" placeholder="Write About Your Schooling,Interests etc."  onChange={this.onChange} />
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