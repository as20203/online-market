import React,{Component} from 'react';
import {Button,Form,Segment,Message} from 'semantic-ui-react';
import axios from 'axios';
import './Signup.css';


class Signup extends Component{
    state= {
      
            username:'',
            password:'',
            email:'',
            city:'',
            phone:'',
            error:null
      
    }

    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const newUser = this.state;
        
        
        axios.post('/user/register', newUser)
          .then((result) => {
            if(result.status === 201){
                //Successful registration
               
                this.props.history.push("/login");
            }
          })
          .catch(error=>{
              this.setState({
                  error:error.response.data.message
              })
          })
      }

      componentDidMount(){
        window.scrollTo(0,0);
      }



    render(){
        let errorMessage = null;
        if(this.state.error){
            errorMessage = <Message  negative>
            <p style={{textAlign:"center"}}>{this.state.error}</p>
            </Message>
        }
    
       
      
        return(
          
     
           <Segment stacked className="SignUpSegment">
           <h1 className="header">Signup</h1>
           {errorMessage}
           <Form onSubmit={this.onSubmit}>
                   <Form.Field inline>
                        <label>Username: </label>
                        <input required type="text" name="username" placeholder="Enter Username" onChange={this.onChange}></input> 
                   </Form.Field>

                   <Form.Field inline>
                        <label>Password:</label>
                        <input required type="password" name="password" placeholder="Enter Password" onChange={this.onChange}></input>
                   </Form.Field>
       
                   <Form.Field inline>
                        <label>Email: </label>
                        <input  required type="email" name="email" placeholder="Enter you email" onChange={this.onChange}></input>
                   </Form.Field>

                   <Form.Field inline>
                            <label>City: </label>
                            <input required type="text" name="city" placeholder="Enter city" onChange={this.onChange}></input>
                    </Form.Field>

                    <Form.Field inline> 
                            <label>Phone No: </label>
                            <input pattern="[0-9]+" required type="text" name="phone" placeholder="Enter phone no" onChange={this.onChange}></input>
                    </Form.Field>


                   <Button secondary className="Button" type='submit'>Signup</Button>
               </Form>
            </Segment>
           

            




        );
    }

}

export default Signup;