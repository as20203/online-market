import React,{Component} from 'react';
import {Button,Form,Segment,Header,Dropdown,Message} from 'semantic-ui-react';
import socketIOClient from "socket.io-client";
import './Product.css'
import axios from 'axios'
import InputNumber from 'react-input-just-numbers';

class Product extends Component{


    state={
        productname:'',
        description:'',
        amount: 0,
        image:null,
        category:'',
        error:null,
        loading:false
       

    }

    constructor(props){
        super(props);
        //connect to socket.
        this.socket =socketIOClient();
    }

    componentWillUnmount(){
        this.socket.disconnect();
    }





    handleChange = (e, { value }) => {
        this.setState({category:value});
    }


    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
    }

    fileSelectHandler = (event) =>{
       
        this.setState({
            image:event.target.files[0]
        })
      
    }

      
     
      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        this.setState({
            loading:true
        })
        
       const fd = new FormData();
       fd.append("productname",this.state.productname);
       fd.append("description",this.state.description);
       fd.append("amount",this.state.amount);
       fd.append("category",this.state.category);
       fd.append('image',this.state.image,this.state.image.name);

        axios.post("/products",fd,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result=>{
           if(result.status===201){
            this.socket.emit('createdProduct',{message:'Created a product.'})
            this.props.history.replace("/allTheProducts");
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
        axios.get("/user/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then((response)=>{
            if(response.data.userData.type!=="Client"){
                localStorage.removeItem("TokenInfo");
                localStorage.removeItem("Authentication");
                this.props.history.push("/login");
            }
            
        })
        .catch(error=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.push("/login");

        })
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
       
        const options = [
            {key:'Accessories',value:'Accessories',text:'Accessories'},
            {key:'Footwear',value:'Footwear',text:'Footwear'},
            {key:'Furniture',value:'Furniture',text:'Furniture'},
            {key:'Clothes',value:'Clothes',text:'Clothes'},
            {key:'Bags',value:'Bags',text:'Bags'},
            {key:'Other',value:'Other',text:'Other'}
          ]
          
    
      
        return(
          
                <Segment stacked className="ProductSegment">
                    
                    <Header color={"grey"} as="h1">Product</Header>
                    {errorMessage}
                    <Form onSubmit={this.onSubmit}>
                            <Form.Field inline>
                                <label>Name: </label>
                                <input required  type="text" name="productname" placeholder="Enter Product Name" onChange={this.onChange}></input> 
                            </Form.Field>
                            <Form.Field inline>
                                <label>Description:</label>           
                                <textarea required style={{width:"200px"}} maxLength="250"  name="description" placeholder="Enter product description upto 250 characters"  onChange={this.onChange} />
                            </Form.Field>

                            <Form.Field inline>
                                <label> Bid Amount: </label>
                                <InputNumber required min="10" name="amount" placeholder="Enter Bid Amount" onChange={this.onChange} />
                            </Form.Field>

                            <Form.Field inline>
                                <label> Image: </label>
                                <input required style={{width:"210px"}}  type="file" name="image"  onChange={this.fileSelectHandler}></input> 
                            </Form.Field>


                            <Form.Field inline>
                                <label>  Category: </label>
                                <Dropdown value={this.state.value} required={true} placeholder='Select Your Category' onChange={this.handleChange} selection options={options} />
                               

                               
                            </Form.Field>
                            
                            {button}
                        </Form>
                        
                </Segment>

        

           
           
           
    
    );

    }
}


export default Product;