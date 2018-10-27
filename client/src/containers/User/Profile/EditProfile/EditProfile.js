import React,{Component} from 'react';
import {Button,Form,Segment,Header} from 'semantic-ui-react';
import './EditProfile.css';
import {Link} from 'react-router-dom';

class EditProfile extends Component{

    state={
        

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
            <div style={{height:"100%" ,marginTop:'100px'}}>
                <Button as={Link} to='/profile' style={{width:'100px'}}  className="Button" color="olive" >Back</Button>
                <Segment stacked className="EditProfile" >
                    
                    <Header color={"grey"} as="h1">Edit Profile</Header>
                    <Form onSubmit={this.onSubmit}>
                           
                            <Form.Field>
                                <label>About Me:</label>           
                                <textarea   name="description" placeholder="Write About Your Schooling,Interests etc."  onChange={this.onChange} />
                            </Form.Field>

                            <Form.Field >
                                <label>Hobbies And Interest:</label>           
                                <textarea   name="description" placeholder="Write about your hobbies and Interests"  onChange={this.onChange} />
                            </Form.Field>

                           

                           
                
                            <Button  secondary className="Button" type='submit'>Edit</Button>
                        </Form>
                        
                </Segment>

          </div>

           
           
           
    
    );

    }
}


export default EditProfile;