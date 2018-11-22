import React,{Component} from 'react';
import {Segment,Container,Header,Form,Dropdown,Button,Divider} from 'semantic-ui-react';
import axios from 'axios'

class Admin extends Component{
    state={
        reportedUser:'',
        users:[]
    }
    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
      }

      onSubmit = (e) => {
        e.preventDefault();
         console.log(this.state.reportedUser);
       
      }

      handleChange = (e, { value }) => {
        this.setState({reportedUser:value});
    }

    componentDidMount(){
        axios.get("/user/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then((result)=>{
            if(result.data.userData.type==="Admin"){
             
             

                axios.get("/user",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
                .then(result=>{
                    let newUsers = [];
                   result.data.allUsers.forEach(user=>{
                       newUsers.push({
                           key:user.id,
                           value:user.username,
                           text:user.username
                       })
                   })

                   this.setState({users:newUsers})

                    window.scrollTo(0,0);
                })
                .catch(error=>{
                    console.log(error);
                })

            
                
            }else{
               
                this.props.history.replace("/");
            }
           
            
        })
        .catch(error=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.replace("/login");

        })
    }
       
      

    render(){
       
      
          const products = [
            {key:'id1',value:'computer',text:'computer'},
            {key:'id2',value:'table',text:'table'},
            {key:'id3',value:'laptop',text:'laptop'},
            {key:'id4',value:'desk',text:'desk'},
            {key:'id5',value:'chair',text:'chair'}
          ]
        return(
            
                <Segment style={{margin:'200px auto',width:'80%'}}>
                    <Header color={'teal'} as='h1'>Admin Panel</Header>
                    <Divider />
                    <Header color={'red'} textAlign='left' as='h4'>Report User</Header>
                    <Container > 
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                       
                                    
                                    <label> Select User: </label>
                                    <Dropdown defaultValue={'Other'} required={true} placeholder='Select User' onChange={this.handleChange} selection options={this.state.users} />
                               

                               
                                     </Form.Field>
                
                                      

                                     <Form.Field>
                                        <Button color={'red'} type='submit' className='Button'> Report User</Button>
                                    </Form.Field>
                                
                                </Form.Group>

                            </Form>
                           
                           
                        </Container>

                         <Divider />
                         <Header color={'red'} textAlign='left' as='h4'>Remove Product</Header>
                         <Container > 
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                    <label> Select Product: </label>
                                    <Dropdown defaultValue={'Other'} required={true} placeholder='Select Product' onChange={this.handleChange} selection options={products} />             
                                     </Form.Field>
                
                                     <Form.Field>
                                        <Button color={'red'} type='submit' className='Button'> Remove Product</Button>
                                    </Form.Field>
                                
                                </Form.Group>

                            </Form>
                           
                           
                        </Container>

                </Segment>
               
           
               
        );
    }
}

export default Admin;