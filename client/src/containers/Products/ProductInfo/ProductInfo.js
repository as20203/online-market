import React,{Component} from 'react';
import {Card,Image,Grid,Segment,Header,Divider,Form, Label,Button,Input,Message} from 'semantic-ui-react';
import './ProductInfo.css'
import socketIOClient from "socket.io-client";
import axios from 'axios'
import ReactTable from 'react-table'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'


const columns = [{
    Header: 'Name',
    accessor: 'Owner.username',
    sortable:false,
    style:{
       
        textAlign:"center"
    }
  }, {
    Header: 'Bid Amount',
    accessor: 'bidAmount',
    style:{
       
        textAlign:"center"
    }

    
  }, {
    Header: "Phone",
    accessor: 'Owner.phone',
    sortable:false,
    style:{
        
        textAlign:"center"
    }
  }]

class Profile extends Component{
    constructor(props){
        super(props);
      
        this.socket =socketIOClient();
    }
    
    state={
        bidAmount:0,
        name:'',
        amount:0,
        description:'',
        owner:'',
        category:null,
        imagePath:null,
        bids:[],
        username:null,
        userType:null,
        biddable:true,
        accountBalance:0,
        errorMessage:null,
        loading:false,
        userId:'',
        ownerLoadingButton:false
       
       
      
      
    }


   

    componentDidMount(){
        //Connecting a socket.
        this.socketConnect()
       
      
        //getProductInfo 
        this.productInfo()
    
      }


      componentWillUnmount(){
        this.socket.disconnect();
    }






      socketConnect = () =>{
        this.socket.on('connect',(event)=>{ 
            this.socket.emit('myRoom',{message:this.props.match.params.id});
            this.updateBalance();
            this.bidsUpdate()
        })

      }

      updateBalance = () =>{
        this.socket.on('updatedBalance',(data)=>{
            //if the owner of product is the user.
            console.log(data);
            if(data.balance.ownerName===this.state.username){
                this.setState({
                    accountBalance:data.balance.ownerBalance
                })
            }
            //if the winner is the user.
            if(data.balance.winnerName === this.state.username){
                this.setState({
                    accountBalance:data.balance.winnerBalance
                })
            }
           
        })
       

      }

      bidsUpdate = () =>{
        this.socket.on('update',({message,biddable})=>{
       
       
            this.setState({
                bids:message,
                biddable:biddable
            })
            })
            

      }


      productInfo = () =>{
              
       
        axios.get("/user/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(()=>{
            
            window.scrollTo(0,0);
            axios.get("/products/"+this.props.match.params.id,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(response=>{
               console.log(response);

                this.setState({
                    name:response.data.product.name,
                    amount:response.data.product.amount,
                    description:response.data.product.description,
                    owner:response.data.product.Owner.username,
                    category:response.data.product.category,
                    imagePath:response.data.product.image,
                    bids:response.data.bids,
                    username:response.data.user.username,
                    userType:response.data.user.type,
                    accountBalance:response.data.balance,
                    biddable:response.data.product.biddable,
                    userId:response.data.product.Owner.user

                })
            })
            .catch(error=>{
              
                console.log(error.response);
                this.props.history.push("/login");
            })
           
            
        })
        .catch(error=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.push("/login");

        })
      }



    onChange = (event) => {
       
        this.setState({ [event.target.name]:event.target.value });
      }

    onClick = (event) =>{
        event.preventDefault();

        this.setState({
            ownerLoadingButton:true
        })
        axios.post("/products/done/"+this.props.match.params.id,{},{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(response=>{
           console.log(response);
         
        })
        .catch(error=>{
            this.setState({
                ownerLoadingButton:false
            })

        })

    }

      onSubmit = (e) => {

        e.preventDefault();
        this.setState({
            loading:true
        })
       const bid = {bidAmount:this.state.bidAmount};

       
       
       axios.post('/products/bid/'+this.props.match.params.id,bid,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
       .then(response=>{
           this.setState({
               errorMessage:null,
               loading:false
           })
         
       })
       .catch(error=>{
           console.log(error.response);
          if(error.response.status===401){
            this.setState({
                errorMessage:error.response.data.message,
                loading:false
            })
          }else{
              this.props.history.push('/products');
          }
          
           
       });
      
      }

    render(){
        let errorMessage = null;
        let bidComp = null;
        let endMessage = null;
        let button = null;
        let ownerButton = null;
      
        //Check for loader.
        if(!this.state.category && !this.state.imagePath){
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

        //Check for any error messages.
       
        if(this.state.errorMessage){
            errorMessage = <Message  negative>
            <p style={{textAlign:"center"}}>{this.state.errorMessage}</p>
            </Message>
        }
      
       //Set button disabled on click.
       if(!this.state.loading){
        button =  <Button size={"large"} color={'teal'} type='submit' className='Button'> Set Bid</Button>
        }else{
        button =  <Button size={"large"} disabled={true} color={'teal'} type='submit' className='Button'> Setting...</Button>
        }
     
       
       //Display bid component if not owner or admin.
       if((this.state.username!==this.state.owner)&&(this.state.userType!=="Admin")){
           bidComp=  <Form onSubmit={this.onSubmit}>

            <Header className="medium text" as="h1" color={"grey"} textAlign={"left"}>Bid On this product</Header>
            <Header style={{fontSize:'20px'}} as="h3" color={"grey"} textAlign={"center"}>Account Balance:- ${this.state.accountBalance}</Header>
                {errorMessage}
           <Form.Group widths='equal'>
               <Form.Field>
                  
                   <Input labelPosition='right' name='bidAmount' type='number'  placeholder='Amount' onChange={this.onChange}>
                       <Label basic>$</Label>
                       <input min={this.state.amount} />
                         <Label>.00</Label>
                       
                    </Input>
                   </Form.Field>

                <Form.Field>
                   {button}
               </Form.Field>
           
           </Form.Group>

       </Form>
       }else{
           //if not admin then owner.
           if(this.state.userType!=="Admin"){
            bidComp =  <Button size={"large"} color={'teal'} disabled={this.state.ownerLoadingButton} onClick={this.onClick} className='Button'> End the bid.</Button>
           }
        }

       

      
        


        //product is not biddable.

        if(!this.state.biddable ){
            endMessage= <Message positive>
            <p style={{textAlign:"center"}}>Bid Ended. The winner will get the product with amount deduced from account.</p>
            </Message>
            bidComp = null;
          }
          
          //Owners profile with link
         let ownerProfile = "/ownerProfile/"+this.state.userId;
         if(this.state.username!==this.state.owner){
             ownerButton =  <Button as={Link} to={ownerProfile} style={{width:'200px'}} className="Button" color="teal" >View Owner Profile</Button>

         }
         
    
        return(
           
            <Grid className="productInfoGrid">

                <Grid.Row className="rowPadding">
                    <Grid.Column computer={5} tablet={7} mobile={16}>
                       
                            <Card className="profileImgCard">
                                <Image style={{height:'290px'}} src={this.state.imagePath}  />
                                <Card.Content>
                                    <Card.Header as='h4' className="medium text" style={{color:'teal'}}>{this.state.name}</Card.Header>
                                    
                                </Card.Content>
                                <Card.Content extra>
                                    
                                        <br/>
                                       
                                </Card.Content>
                            </Card>
                        
                    </Grid.Column>
                   
                    <Grid.Column computer={11} tablet={9} mobile={16}>
                   
                     <Segment raised className="profileSegment" style={{borderRadius:'10px'}}>
                        {ownerButton}
                        <Header className="medium text" as="h1" color={"grey"} textAlign={"left"}>Description</Header>
                       
                            <p className="small text profileContent">
                           {this.state.description}

                            </p>
                        
                        <Divider section />
                       

                         <Header className="medium text" as="h1"color={"grey"} textAlign={"left"}>Price</Header>
                        
                            <p className="small text">${this.state.amount}</p>
                      
                        <Divider section />

                         <Header className="medium text" as="h1" color={"grey"} textAlign={"left"}>Product Owner</Header>
                         
                            <p className="small text">{this.state.owner}</p>
                        
                        <Divider section />
                        <Header className="medium text" as="h1" color={"grey"} textAlign={"left"}>Product Category</Header>
                       
                            <p className="small text profileContent">
                                {this.state.category}
                            </p>
                         <Divider section />
                            {bidComp}
                            {endMessage}
                        <Divider section />
                             <ReactTable
                            data={this.state.bids}
                             columns={columns}
                             minRows={8} 
                             className="-striped -highlight"                        
                        /> 
                    </Segment>     
                    </Grid.Column>       
                </Grid.Row>          
            </Grid>          
        )
    }  
}
   
export default Profile;