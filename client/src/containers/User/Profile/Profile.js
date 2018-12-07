import React,{Component} from 'react';
import {Input,Button,Card,Image,Grid,Segment,Header,Divider,Form,Message} from 'semantic-ui-react';
import './Profile.css'
import axios from 'axios'
import {Link} from 'react-router-dom';
import ProductLi from '../../../components/ProductLi/ProductLi';
import socketIOClient from "socket.io-client";
import Loader from 'react-loader-spinner'
import ReactTable from 'react-table'




class Profile extends Component{
    state = {
        username:'',
        aboutMe:'',
        hobbies:'',
        city:'',
        phone:'',
        image:null,
        imagePath:'',
        products:[],
        imageError:null,
        accountBalance: 0,
        userType:null,
        loading:false,
        wonProducts:[],
        btnDisable:false,
        errorMessage:null
          
      }


    constructor(props){
        super(props)
        this.columns = [{
            Header: 'Name',
            accessor: 'name',
            sortable:false,
            style:{
               
                textAlign:"center"
            }
          }, {
            Header: 'Bid Amount',
            accessor: 'winner.amount',
            style:{
                
                textAlign:"center"
            }
        
            
          }, {
            Header: "Received",
            accessor: 'received',
            sortable:false,
            Cell: (row) =>{
               return (row.original.received===false?<Button disabled={this.state.btnDisable}  onClick={(e)=>{
              
                this.getProduct(row.original);
            }} 
            color="orange">Get Product</Button>:<Button  color="orange" disabled>Received</Button>) 
                
            },
            style:{
              
                textAlign:"center"
            }
          }];

          this.socket =socketIOClient();

    }


    componentDidMount(){
        this.socket.on("connect",(event)=>{
            this.socket.on('productWon',(data)=>{
                if(data.winner ===this.state.username){
                  this.profileData();
                }
              })

              this.socket.on('updatedBalance',(data)=>{
                //if the owner of product is the user.
                if(data.balance.ownerName===this.state.username){
                    this.profileData();
                }
              
               
            })

        })
        

       
        if(localStorage.getItem("Token")){
            window.scrollTo(0,0);
            this.profileData();

        }else{
            this.props.history.replace('/login');
          
          
        }     
      }

    getProduct = (rowData) =>{
        this.setState({
            btnDisable:true
        })
       
    axios.post("/products/received/"+rowData.winner.productId,rowData,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
    .then(response=>{
        this.profileData();
      
    })
    .catch(error=>{
       
        this.setState({
            btnDisable:false,
            errorMessage:error.response.data.message
        })
    })
    }

   

    profileData = () =>{

        axios.get('/user/profile', { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result=>{
               
                this.setState({
                    username:result.data.userData.username,
                    aboutMe:result.data.userData.aboutMe,
                    hobbies:result.data.userData.hobbies,
                    city:result.data.userData.city,
                    phone:result.data.userData.phone,
                    imagePath:result.data.userData.userImage,
                    products:result.data.products.products,
                    accountBalance:result.data.userData.balance,
                    userType:result.data.userData.type,
                    wonProducts:result.data.wonProducts.products,
                    btnDisable:false
    
                });
            
        })
        .catch(error=>{
            this.setState({
                btnDisable:false
            })
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
          this.props.history.replace('/login');
        })

    }

    onSubmit = (e) =>{
        e.preventDefault();
        this.setState({
            loading:true
        })
        const fd = new FormData();
       
        fd.append('image',this.state.image,this.state.image.name);
       

        axios.post('/user/profileImage',fd,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result=>{

            axios.get('/user/profile', { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(result=>{
                    
              
                   
                    window.scrollTo(0,0);
                    this.setState({
                        error:null,
                        imagePath:result.data.userData.userImage,
                        loading:false
        
                    });
                
            }
    
            )
            .catch(error=>{
                localStorage.removeItem("TokenInfo");
                localStorage.removeItem("Authentication");
              this.props.history.replace('/login');
            })

            
        })
        .catch(error=>{
            this.setState({
                imageError:error.response.data.message,
                loading:false
              
            })
        })
    }

    fileSelectHandler = (event) =>{
      
        this.setState({
            image:event.target.files[0]
        })
      
    }

    render(){
        let button = null;
        let errorMessage = null;
        let balanceErrorMessage = null;
        let userInfo = null;
      
        
        if(!this.state.userType && !this.state.image){
            return(
                <div style={{margin:'350px auto',minHeight:'80vh',width:'1.5em'}}>
                <Loader 
                   
                    
                   type="Grid"
                   color="#DFCFBE"
                   height="80"	
                    width="80"
                   
                />  
                </div> 
               );

        }
        
          //initially no loading.
        if(!this.state.loading){
            button =  <Button size={"large"} type="submit"   color="blue" className="profileButton">Upload Image</Button>;
        }else{
            button = <Button size={"large"} disabled={true} type="submit"   color="blue" className="profileButton">Uploading...</Button>;
        }
    

       //wrong image.
        if(this.state.imageError){
            errorMessage = <Message  negative>
            <p style={{textAlign:"center"}}>{this.state.imageError}</p>
            </Message>
              setTimeout(() => {
                this.setState({
                   imageError:null
                })
            }, 1500);
        }


        const productList = this.state.products.map((product,index)=>{
            return ( <Grid.Column key={index} computer={8} tablet={16} mobile={16}>
                        <ProductLi key={product._id} _id={product._id} name={product.name} description={product.description} imageSrc={product.productImage} />
                    </Grid.Column>)
        })

         //Check for error messages.
         if(this.state.errorMessage){
            balanceErrorMessage = <Message negative>
            <p style={{textAlign:"center"}}>{this.state.errorMessage}</p>
            </Message>
              setTimeout(() => {
                this.setState({
                   errorMessage:null
                })
            }, 2000);
        }


        
       
      
        if(this.state.userType!=="Admin"){
            userInfo =  <div>
             <Divider section />
            <Header as="h1"  className="medium text" color={"grey"} textAlign={"left"}>Account Balance:</Header>
             <div className="small text profileContainer2"> 
                <p>${this.state.accountBalance}</p>
            </div>
            <Divider section />
            <Header as="h1"  className="medium text" color={"grey"} textAlign={"left"}>My Products:</Header>
            <div className="profileContainer1"> 
            <Grid>
              {productList}      
          </Grid>    
            </div>

            <div className="profileContainer1">
            <Divider section />
            <Header as="h1"  className="medium text" color={"grey"} textAlign={"left"}>My Won Products</Header>
            {/* Balance error messages */}
                {balanceErrorMessage}
            <ReactTable
                    data={this.state.wonProducts}
                    columns={this.columns}
                    minRows={8}
                    className="-striped -highlight"
                           
                        />
            
            </div>
            </div>
        }
       

        

       
        return(
           
            <Grid className="profileGrid">
             
                <Grid.Row className="rowPadding">
                    <Grid.Column  computer={5} tablet={7} mobile={16}>
                       
                            <Card className="profileImgCard">
                                <Image src={this.state.imagePath}  style={{marginTop:"0px"}} />
                                <Card.Content>
                                    <Card.Header as='h4' className="medium text"  style={{color:'grey'}}>{this.state.username}</Card.Header>
                                   {errorMessage}
                                    
                                </Card.Content>
                                <Card.Content extra>
                                <Form onSubmit={this.onSubmit}>
                                    <Input  type="file" required className="userImage" name="image" onChange={this.fileSelectHandler} /> 
                                        <br/>
                                        {button}
                                </Form>

                                </Card.Content>
                            </Card>
                        
                    </Grid.Column>
                   
                    <Grid.Column computer={11} tablet={9} mobile={16}>
                     <Segment raised className="profileSegment">
                     <Button  as={Link} to='/editProfile' className="profileButton" style={{width:'180px'}} color="teal" >Edit Profile</Button>
                        <Header as="h1"  className="medium text" color={"grey"} textAlign={"left"}>About Me</Header>
                        <div className="profileContainer1">
                            <p className="small text profileContent">
                           {this.state.aboutMe}

                            </p>
                        </div>
                        <Divider section />
                        <Header as="h1"  className="medium text" color={"grey"} textAlign={"left"}>My Hobbies And Interests</Header>
                        
                        <div className="profileContainer1"> 
                            <p className="small text profileContent">
                               {this.state.hobbies}

                            </p>
                        </div>
                        <Divider section />

                         <Header  className="medium text" as="h1"color={"grey"} textAlign={"left"}>City</Header>
                         <div className="small text profileContainer2"> 
                            <p>{this.state.city}</p>
                        </div>
                        <Divider section />

                         <Header  className="medium text" as="h1" color={"grey"} textAlign={"left"}>Phone No:</Header>
                         <div className="small text profileContainer2"> 
                            <p>{this.state.phone}</p>
                        </div>
                       
                           
                       {userInfo}


                    </Segment>

                          
                    
                    
                    </Grid.Column>
                  
                </Grid.Row>    
                
            
                
               
            </Grid>
          
        )
    }

    
}
   


export default Profile;