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
            error:null,
            loading:false
      
    }

    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading:true
        })
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
                  error:error.response.data.message,
                  loading:false
              })
          })
      }

      componentDidMount(){
        window.scrollTo(0,0);
      }



    render(){
        let errorMessage = null;
        let button = null;
        if(this.state.error){
            errorMessage = <Message  negative>
            <p style={{textAlign:"center"}}>{this.state.error}</p>
            </Message>
        }
        //Button is not loading intitally
        if(!this.state.loading){
            button =  <Button  secondary className="Button" type='submit'>Create</Button>;
        }else{
            button = <Button disabled={true}  secondary className="Button" type='submit'>Creating...</Button>
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
                            <label>City: </label>
                            <input required type="text" name="city" placeholder="Enter city" onChange={this.onChange}></input>
                    </Form.Field>

                    <Form.Field inline> 
                            <label>Phone No: </label>
                            <input pattern="[0-9]+" maxLength="11" minLength="11" required type="text" name="phone" placeholder="Enter phone no" onChange={this.onChange}></input>
                    </Form.Field>


                  {button}
               </Form>
            </Segment>
           

            




        );
    }

}

export default Signup;