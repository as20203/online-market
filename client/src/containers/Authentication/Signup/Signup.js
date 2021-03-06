import React,{Component} from 'react';
import {Button,Form,Segment,Message,Header} from 'semantic-ui-react';
import axios from 'axios';
import './Signup.css';
import socketIOClient from "socket.io-client";



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

    constructor(props){
        super(props);
        this.socket =socketIOClient();
    }

    componentWillUnmount(){
        this.socket.disconnect();
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
                this.socket.emit('createdUser',{message:'Created a product.'})
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
            button =  <Button size={'large'} secondary className="Button" type='submit'>Create</Button>;
        }else{
            button = <Button size={'large'} disabled={true}  secondary className="Button" type='submit'>Creating...</Button>
        }
    
       
      
        return(
          
     
           <Segment stacked  className="SignUpSegment">
            <Header as="h1" className="medium text" align={'center'} color="grey">Sign Up </Header>
           {errorMessage}
           <Form onSubmit={this.onSubmit}>
                   <Form.Field inline>
                        <label className="small text">Username: </label>
                        <input required type="text" name="username" placeholder="Enter Username" onChange={this.onChange}></input> 
                   </Form.Field>

                   <Form.Field inline>
                        <label className="small text">Password:</label>
                        <input required type="password" name="password" placeholder="Enter Password" onChange={this.onChange}></input>
                   </Form.Field>

                   <Form.Field inline>
                            <label className="small text">City: </label>
                            <input required type="text" name="city" placeholder="Enter city" onChange={this.onChange}></input>
                    </Form.Field>

                    <Form.Field inline> 
                            <label className="small text">Phone No: </label>
                            <input pattern="[0-9]+" maxLength="11" minLength="11" required type="text" name="phone" placeholder="Enter phone no" onChange={this.onChange}></input>
                    </Form.Field>


                  {button}
               </Form>
            </Segment>
           

            




        );
    }

}

export default Signup;