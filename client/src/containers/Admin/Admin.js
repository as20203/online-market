import React,{Component} from 'react';
import {Segment,Container,Header,Form,Dropdown,Button,Divider,Message} from 'semantic-ui-react';
import axios from 'axios'
import Loader from 'react-loader-spinner'

class Admin extends Component{
    state={
        reportedUser:'',
        removedProduct:'',
        users:[],
        products:[],
        userMessage:null,
        productMessage:null

    }
  

      onUserSubmit = (e) => {
        e.preventDefault();
         
         axios.delete('/user/'+this.state.reportedUser,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
         .then(response=>{
             console.log(response);
            console.log(response.data.message);
            this.setState({
                userMessage:response.data.message
            })
         }
 
         )
         .catch(error=>{
             console.log(error.response);
         })


        
       
      }

      onProductSubmit = (e) =>{
        e.preventDefault();
       
        axios.delete('/products/'+this.state.removedProduct,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(response=>{
            console.log(response.data.message);
            this.setState({
                productMessage:response.data.message
            })
           
        }

        )
        .catch(error=>{
            console.log(error.response);
        })
      }


      handleChange = (event,data) => {
        this.setState({[data.name]:data.value});
    }

    dataFunction = () =>{
        axios.get("/user",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result=>{
            let newUsers = [];
            let newProducts= [];
           result.data.allUsers.forEach(user=>{
               newUsers.push({
                   key:user.id,
                   value:user.id,
                   text:user.username
               })
           })

       
            axios.get("/products",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(result=>{
               
               result.data.products.forEach(product=>{
                newProducts.push({
                       key:product._id,
                       value:product._id,
                       text:product.name
                   })
               })

               this.setState({
                users:newUsers,
                products:newProducts,
                userMessage:null,
                productMessage:null
            })

               
            })
            .catch(error=>{
                console.log(error);
            })

           
        })
        .catch(error=>{
            console.log(error);
        })


    }

    componentDidMount(){
        

        axios.get("/user/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then((result)=>{
            if(result.data.userData.type==="Admin"){
                window.scrollTo(0,0);
             
             this.dataFunction();

            this.Interval = setInterval(()=>{ this.dataFunction(); },5000);   
            
            
                
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

    componentWillUnmount() {
        clearInterval(this.Interval);
       
      }
       
      

    render(){
        if(!this.state.users.length && !this.state.products.length){
            return(
                <div style={{margin:'350px auto',minHeight:'80vh',width:'1.5em'}}>
                <Loader 
                    className="loader"
                    
                   type="Grid"
                   color="#DFCFBE"
                   height="80"	
                    width="80"
                   
                />  
                </div> 
               );

        }
        let userMessage = null;
        let productMessage = null;
        if(this.state.userMessage){
            userMessage = <Message  positive>
            <p style={{textAlign:"center"}}>{this.state.userMessage}</p>
            </Message>
        }

        if(this.state.productMessage){
            productMessage = <Message  positive>
            <p style={{textAlign:"center"}}>{this.state.productMessage}</p>
            </Message>
        }
       
       
        return(
            
                <Segment style={{margin:'200px auto',width:'80%'}}>
                    <Header color={'teal'} as='h1'>Admin Panel</Header>
                    <Divider />
                    <Header color={'red'} textAlign='left' as='h4'>Remove User</Header>
                  
                    {userMessage}
                    <Container > 
                            <Form onSubmit={this.onUserSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                       
                                    
                                    <label> Select User: </label>
                                    <Dropdown name="reportedUser" defaultValue={'Other'} required={true} placeholder='Select User' onChange={this.handleChange} selection options={this.state.users} />
                                     </Form.Field>
                
                                     <Form.Field>
                                        <Button color={'red'} type='submit' className='Button'> Remove User</Button>
                                    </Form.Field>
                                
                                </Form.Group>

                            </Form>
                           
                           
                        </Container>

                         <Divider />
                         <Header color={'red'} textAlign='left' as='h4'>Remove Product</Header>
                         {productMessage}
                         <Container > 
                            <Form onSubmit={this.onProductSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                    <label> Select Product: </label>

                                    <Dropdown name="removedProduct" defaultValue={'Other'}  required={true} placeholder='Select Product' onChange={this.handleChange} selection options={this.state.products} />             
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