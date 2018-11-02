import React,{Component} from 'react';
import {Button,Form,Segment} from 'semantic-ui-react';
import axios from 'axios';
import './Signup.css';


class Signup extends Component{
    state= {
      
            username:'',
            password:'',
            email:'',
            city:'',
            phone:''
      
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
          });
      }

<<<<<<< HEAD
      componentDidMount(){
        window.scrollTo(0,0);
      }



    render(){
      
        return(
          
     
           <Segment stacked className="SignUpSegment">
=======


    render(){
        window.scrollTo(0,0);
        return(
          
     
           <Segment stacked className="Segment">
>>>>>>> origin/master
           <h1 className="header">Signup</h1>
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
                        <input required type="email" name="email" placeholder="Enter you email" onChange={this.onChange}></input>
                   </Form.Field>

                   <Form.Field inline>
                            <label>City: </label>
                            <input required type="text" name="city" placeholder="Enter city" onChange={this.onChange}></input>
                    </Form.Field>

                    <Form.Field inline> 
                            <label>Phone No: </label>
                            <input required type="text" name="phone" placeholder="Enter phone no" onChange={this.onChange}></input>
                    </Form.Field>


                   <Button secondary className="Button" type='submit'>Signup</Button>
               </Form>
            </Segment>
           

            




        );
    }

}

export default Signup;