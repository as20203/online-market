import React,{Component} from 'react';
import {Segment,Container,Header,Form,Dropdown,Button,Divider,Message} from 'semantic-ui-react';
import axios from 'axios'
import Loader from 'react-loader-spinner'
import socketIOClient from "socket.io-client";
class Admin extends Component{
    state={
        reportedUser:'',
        removedProduct:'',
        users:[],
        products:[],
        userMessage:null,
        productMessage:null,
        userLoader:false,
        productLoader:false

    }

    constructor(props){
        super(props);
        //connect to socket.
        this.socket =socketIOClient();
    }

    componentDidMount(){

        this.socket.on('connect',(event)=>{
            //Update users 
            this.socket.on('updatedUsers',(data)=>{
                this.updateUsers();   
            })
            //Update products.
            this.socket.on('updateProduct',(data)=>{
                this.updateProducts();
            })
           
          
        });

        axios.get("/user/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then((result)=>{
            if(result.data.userData.type==="Admin"){
                window.scrollTo(0,0);
             
             this.dataFunction();            
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

    componentWillUnmount(){
        this.socket.disconnect();
    }

    updateUsers = () =>{
         
            //Send request to server.
            axios.get("/user",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(result=>{
                
                let newUsers = [];
           
                result.data.allUsers.forEach(user=>{
                    newUsers.push({
                            key:user._id,
                            value:user._id,
                            text:user.username
                    })
                });
               

            this.setState({
                users:newUsers

            })

            })
       

    }

    updateProducts = () =>{
        //Updating product list.  
            
            axios.get("/products",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(result=>{
               let newProducts = [];
               result.data.products.forEach(product=>{
                newProducts.push({
                       key:product._id,
                       value:product._id,
                       text:product.name
                   })
               })
              
               this.setState({
                    products:newProducts

                });
                

            })


    }

   

      onUserSubmit = (e) => {
        e.preventDefault();
        this.setState({
            userLoader:true
        })
         
         axios.delete('/user/'+this.state.reportedUser,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
         .then(response=>{
            
            this.setState({
                userMessage:response.data.message,
                userLoader:false
            });
            this.updateUsers();
         }
 
         )
         .catch(error=>{
             this.setState({
                userLoader:false
             })
             console.log(error.response);
         })
      }


      onProductSubmit = (e) =>{
        e.preventDefault();
        this.setState({
            productLoader:true
        })
       
        axios.delete('/products/'+this.state.removedProduct,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(response=>{
            this.socket.emit("removedProduct",{message:"deleted"});
            this.setState({
                productMessage:response.data.message,
                productLoader:false
            })
           this.updateProducts();
           
        }

        )
        .catch(error=>{
            this.setState({
                productLoader:false
            })
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
                   key:user._id,
                   value:user._id,
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

    render(){
        let productButton = null;
        let userButton = null;
        let userMessage = null;
        let productMessage = null;
        //Check if data has loaded or not.
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
       
        //Check for messages of delete in user.
        if(this.state.userMessage){
            userMessage = <Message   positive>
            <p style={{textAlign:"center"}}>{this.state.userMessage}</p>
            </Message>
            setTimeout(() => {
                this.setState({
                    userMessage:null
                })
            }, 1500);
        }

        //Check for messages of delete in product.
        if(this.state.productMessage){
            productMessage = <Message  positive>
            <p style={{textAlign:"center"}}>{this.state.productMessage}</p>
            </Message>
              setTimeout(() => {
                this.setState({
                   productMessage:null
                })
            }, 1500);
        }

        //Button disabled when clicked.
        if(!this.state.userLoader){
            userButton =  <Button size={'large'} color={'red'} type='submit' className='Button'> Remove User</Button>
        }else{
            userButton = <Button size={'large'} disabled={true} color={'red'} type='submit' className='Button'> Removing...</Button>
        }

        //Button disabled on click.
        if(!this.state.productLoader){
            productButton = <Button size={'large'} color={'red'} type='submit' className='Button'> Remove Product</Button>

        }else{
            productButton = <Button size={'large'} disabled={true} color={'red'} type='submit' className='Button'> Removing...</Button>
        }
       
       
        return(
            
                <Segment style={{margin:'200px auto',width:'80%',border:'2px solid cadetblue',borderRadius:'20px'}}>
                    <Header className="large text"  color={'teal'} as='h1'>Admin Panel</Header>
                    <Divider />
                    <Header  className="medium text" color={'grey'} textAlign='left' as='h4'>Remove User</Header>
                  
                    {userMessage}
                    <Container > 
                            <Form onSubmit={this.onUserSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                       
                                    
                                    <label className="small text"> Select User: </label>
                                    <Dropdown name="reportedUser"  required={true} placeholder='Select User' onChange={this.handleChange} selection options={this.state.users} />
                                     </Form.Field>
                
                                     <Form.Field>
                                       {userButton}
                                    </Form.Field>
                                
                                </Form.Group>

                            </Form>
                           
                           
                        </Container>

                         <Divider />
                         <Header className="medium text" color={'grey'} textAlign='left' as='h4'>Remove Product</Header>
                         {productMessage}
                         <Container > 
                            <Form onSubmit={this.onProductSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                    <label className="small text"> Select Product: </label>

                                    <Dropdown  name="removedProduct"   required={true} placeholder='Select Product' onChange={this.handleChange} selection options={this.state.products} />             
                                     </Form.Field>
                
                                     <Form.Field>
                                        {productButton}
                                    </Form.Field>
                                
                                </Form.Group>

                            </Form>
                           
                           
                        </Container>

                </Segment>
               
           
               
        );
    }
}

export default Admin;