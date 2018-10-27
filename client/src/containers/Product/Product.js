import React,{Component} from 'react';
import {Button,Form,Segment,Header,Dropdown} from 'semantic-ui-react';



class Product extends Component{

    state={
        productname:'',
        description:'',
        amount: 0,
        image:'',
        category:'Other'

    }


    handleChange = (e, { value }) => {
        this.setState({category:value});
    }


    onChange = (event) => {
        
        this.setState({ [event.target.name]:event.target.value });
      }

      
      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        
        const newProduct = this.state;
        
       console.log(newProduct);
      }
    

    render(){
        const options = [
            {key:'Accessories',value:'Accessories',text:'Accessories'},
            {key:'Footwear',value:'Footwear',text:'Footwear'},
            {key:'Furniture',value:'Furniture',text:'Furniture'},
            {key:'Clothes',value:'Clothes',text:'Clothes'},
            {key:'Bags',value:'Bags',text:'Bags'}
          ]
          
    
      
        return(
            <div style={{height:"100%"}}>
                <Segment stacked className="Segment">
                    
                    <Header color={"grey"} as="h1">Product</Header>
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
                                <input required  type="number" min='0' name="amount" placeholder="Enter Bid Amount" onChange={this.onChange}></input> 
                            </Form.Field>

                            <Form.Field inline>
                                <label> Image: </label>
                                <input required style={{width:"210px"}}  type="file" name="image"  onChange={this.onChange}></input> 
                            </Form.Field>


                            <Form.Field inline>
                                <label>  Category: </label>
                                <Dropdown defaultValue={'Other'} required={true} placeholder='Select Your Category' onChange={this.handleChange} selection options={options} />
                               

                               
                            </Form.Field>
                
                            <Button  secondary className="Button" type='submit'>Create</Button>
                        </Form>
                        
                </Segment>

          </div>

           
           
           
    
    );

    }
}


export default Product;