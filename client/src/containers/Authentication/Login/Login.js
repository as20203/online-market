import React,{Component} from 'react';

import {Button,Form,Segment} from 'semantic-ui-react';
import './Login.css'
import axios from 'axios'


class Login extends Component{
    state={
        username:'',
        password:''
    }


    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
      }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        
        const newUser = this.state;
        
        
        axios.post('/user/login', newUser)
          .then((result) => {
            if(result.status===200){
                //Here we would later redirect when the page is made
                //We would also store the token in our local storage to use later.
                localStorage.setItem("Token",result.data.token);
                localStorage.setItem("Authentication"," ");
                this.props.history.replace("/products");
                console.log(result);
            }
          });
      }
   

    render(){
    
      
        return(
       
           <Segment stacked className="Segment">
            
            <h1 className="header">Login</h1>
            <Form onSubmit={this.onSubmit}>
                    <Form.Field inline>
                    <label >Username: </label>
                    <input  type="text" name="username" placeholder="Enter Username" onChange={this.onChange}></input> 
                    </Form.Field>
                    <Form.Field inline>
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Enter Password" onChange={this.onChange}></input>
                    </Form.Field>
        
                    <Button  secondary className="Button" type='submit'>Login</Button>
                </Form>
                
          </Segment>

           
           
           
    
    );

    }
}

export default Login;
    


