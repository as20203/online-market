import React, { Component } from 'react';
import './Products.css';
import ProductLi from './ProductLi/ProductLi';
import SearchFluid from './ProductSearch/ProductSearch';
import {Container,Grid} from 'semantic-ui-react';





class Products extends Component {
  

  

  render() {

     
    return (
      <div>
          <div style={{ background: '#e4efe9',height:'70%',paddingBottom:'50px',marginTop:"100px"}}>

          <SearchFluid /> 
          
          
            <Container className="ProductContainerStyle">
                <Grid>
                
                       <Grid.Column computer={5} tablet={8} mobile={16}>
                       <ProductLi />
                      </Grid.Column>

                      <Grid.Column computer={5} tablet={8} mobile={16}>
                        <ProductLi />
                      </Grid.Column>


                      <Grid.Column computer={5} tablet={8} mobile={16}>
                        <ProductLi />
                      </Grid.Column>

                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column>


                       <Grid.Column computer={5} tablet={8} mobile={16}>
                        <ProductLi />
                      </Grid.Column>

                      <Grid.Column computer={5} tablet={8} mobile={16}>
                        <ProductLi />
                      </Grid.Column>


                      <Grid.Column computer={5} tablet={8} mobile={16}>
                        <ProductLi />
                      </Grid.Column>

                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi />
                      </Grid.Column> 

                     

                    
      

              
                
                      
                </Grid>

            </Container>

           
                    
      
          </div>


          

          
      </div>
    );
  }
}

export default Products;
 