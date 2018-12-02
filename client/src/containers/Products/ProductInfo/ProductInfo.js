import React,{Component} from 'react';
import {Card,Image,Grid,Segment,Header,Divider,Form, Label,Button,Input,Message} from 'semantic-ui-react';
import './ProductInfo.css'
import socketIOClient from "socket.io-client";
import axios from 'axios'
import ReactTable from 'react-table'
import "react-table/react-table.css"
import Loader from 'react-loader-spinner'


const columns = [{
    Header: 'Name',
    accessor: 'Owner.username',
    sortable:false,
    style:{
        border:"2px solid black",
        textAlign:"center"
    }
  }, {
    Header: 'Bid Amount',
    accessor: 'bidAmount',
    style:{
        border:"2px solid black",
        textAlign:"center"
    }

    
  }, {
    Header: "Phone",
    accessor: 'Owner.phone',
    sortable:false,
    style:{
        border:"2px solid black",
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
        errorMessage:null
       
      
      
    }


   
    onChange = (event) => {
       
        this.setState({ [event.target.name]:event.target.value });
      }

    onClick = (event) =>{
        event.preventDefault();
        axios.post("/products/done/"+this.props.match.params.id,{},{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(response=>{
           
        })
        .catch(error=>{

        })

    }

      onSubmit = (e) => {

        e.preventDefault();
       const bid = {bidAmount:this.state.bidAmount};

       
       
       axios.post('/products/bid/'+this.props.match.params.id,bid,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
       .then(response=>{
           this.setState({
               errorMessage:null
           })
         
       })
       .catch(error=>{
          
           this.setState({
               errorMessage:error.response.data.message
           })
       });
      
      }

      componentWillUnmount(){
          this.socket.disconnect();
      }

      componentDidMount(){
        this.socket.emit('myRoom',{message:this.props.match.params.id});
        this.socket.on('update',({message,biddable})=>{
       
       
        this.setState({
            bids:message,
            biddable:biddable
        })
        })
        
       
        axios.get("/user/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(()=>{
            
            window.scrollTo(0,0);
            axios.get("/products/"+this.props.match.params.id,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(response=>{
               

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
                    accountBalance:response.data.user.balance,
                    biddable:response.data.product.biddable

                })
            })
            .catch(error=>{
                console.log(error.response);
            })
           
            
        })
        .catch(error=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.push("/login");

        })
      }


    render(){
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
        let errorMessage = null;
        if(this.state.errorMessage){
            errorMessage = <Message  negative>
            <p style={{textAlign:"center"}}>{this.state.errorMessage}</p>
            </Message>
        }
      
      
       let bidComp = null;
       let endMessage = null;
       
       if((this.state.username!==this.state.owner)&&(this.state.userType!=="Admin")){
           bidComp=  <Form onSubmit={this.onSubmit}>

            <Header as="h1" color={"grey"} textAlign={"left"}>Bid On this product</Header>
            <Header as="h3" color={"grey"} textAlign={"center"}>Account Balance:- ${this.state.accountBalance}</Header>
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
                   <Button color={'teal'} type='submit' className='Button'> Set Bid</Button>
               </Form.Field>
           
           </Form.Group>

       </Form>
       }else{
           if(this.state.userType!=="Admin"){
            bidComp =  <Button color={'teal'} onClick={this.onClick} className='Button'> End the bid.</Button>
           }
        }
        //product is not biddable.
        if(!this.state.biddable ){
            endMessage= <Message positive>
            <p style={{textAlign:"center"}}>Bid Ended. The winner will get the product with amount deduced from account.</p>
            </Message>
            bidComp = null;
          }
       
         
    
        return(
           
            <Grid className="productInfoGrid">

                <Grid.Row className="rowPadding">
                    <Grid.Column computer={5} tablet={7} mobile={16}>
                       
                            <Card className="profileImgCard">
                                <Image style={{height:'290px'}} src={this.state.imagePath}  />
                                <Card.Content>
                                    <Card.Header as='h4' style={{color:'teal'}}>{this.state.name}</Card.Header>
                                    
                                </Card.Content>
                                <Card.Content extra>
                                    
                                        <br/>
                                       
                                </Card.Content>
                            </Card>
                        
                    </Grid.Column>
                   
                    <Grid.Column computer={11} tablet={9} mobile={16}>
                     <Segment raised className="profileSegment" style={{borderRadius:'10px'}}>
                        <Header as="h1" color={"grey"} textAlign={"left"}>Description</Header>
                       
                            <p className="profileContent">
                           {this.state.description}

                            </p>
                        
                        <Divider section />
                       

                         <Header as="h1"color={"grey"} textAlign={"left"}>Price</Header>
                        
                            <p>${this.state.amount}</p>
                      
                        <Divider section />

                         <Header as="h1" color={"grey"} textAlign={"left"}>Product Owner</Header>
                         
                            <p>{this.state.owner}</p>
                        
                        <Divider section />
                        <Header as="h1" color={"grey"} textAlign={"left"}>Product Category</Header>
                       
                            <p className="profileContent">
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
                           
                        />
                           
                     
                    </Segment>
                  
                    </Grid.Column>
                  
                </Grid.Row>    
                
            
                
               
            </Grid>
          
        )
    }

    
}
   


export default Profile;