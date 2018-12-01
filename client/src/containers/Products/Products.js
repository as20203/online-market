import React, { Component } from 'react';
import './Products.css';
import ProductLi from './ProductLi/ProductLi';

import {Container,Grid,Input,Dropdown} from 'semantic-ui-react';



import axios from 'axios';

const options = [
    {key:'All',value:'All',text:'All'},
    {key:'Accessories',value:'Accessories',text:'Accessories'},
    {key:'Footwear',value:'Footwear',text:'Footwear'},
    {key:'Furniture',value:'Furniture',text:'Furniture'},
    {key:'Clothes',value:'Clothes',text:'Clothes'},
    {key:'Bags',value:'Bags',text:'Bags'},
    {key:'Other',value:'Other',text:'Other'}
  ]
  

class Products extends Component {
    state = {
        products:[],
        search: '',
        category:'',
        text:''
    }

    updateSearch=(event) =>{
        const searching= event.target.value;
        this.setState({
            search:searching
        })

    }

    handleChange = (e, { value }) => {
        this.setState({category:value});
    }


    updateCategory=(event,{value})=>{
       if (value==='All'){
           this.setState({
               category:'',
               text:'All'
           })
       }else{
        this.setState({
            category:value,
            text:value
         })

       }

        
    }
   
    dataFunction = ()=>{
        axios.get('/products',{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
    .then(response=>{
      
       
       this.setState({
           products:response.data.products
       })

    
    })
    .catch(error=>{
        console.log(error);
    })
        
    }


   componentDidMount(){
    window.scrollTo(0,0);
    this.dataFunction()
    this.Interval = setInterval(()=>{ this.dataFunction(); },15000);  
   }

   componentWillMount(){
    clearInterval(this.Interval);
   }
  

  render() {


   let filteredProducts = this.state.products.filter(product=>{
       let names = product.name.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
       let category = product.category.toLowerCase().indexOf(this.state.category.toLowerCase())!==-1;
       return names && category;
   });
  
    let productList = filteredProducts.map((product,index)=>{
        return ( <Grid.Column key={index} computer={5} tablet={8} mobile={16}>
                    <ProductLi key={product._id} _id={product._id} name={product.name} description={product.description} imageSrc={product.productImage} />
                </Grid.Column>)
    })
   

    
    return (
     
          <div className="ProductStyle" >

        <Grid style={{width:'100%'}} centered={true} columns={2}>
       
        
        <Grid.Column  computer={16} >
        <Input  style={{margin:'0px auto',display:'block',width:'13.2em'}} icon='search' value={this.state.search} onChange={this.updateSearch} placeholder='Search...' />
      </Grid.Column>

       <Grid.Column  computer={16}>
       <Dropdown style={{margin:'0px auto',display:'block',width:'13.2em'}}   value={this.state.text} required={true} placeholder='Category' onChange={this.updateCategory} selection options={options} />
      </Grid.Column>
     
      

        </Grid>
         


            <Container className="ProductContainerStyle">
                <Grid>

                     {productList}
                    
                      
                </Grid>

            </Container>

          </div>     
     
    );
  }
}

export default Products;
 