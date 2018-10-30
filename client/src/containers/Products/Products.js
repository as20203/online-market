import React, { Component } from 'react';
import './Products.css';
import ProductLi from './ProductLi/ProductLi';
import SearchFluid from './ProductSearch/ProductSearch';
import {Container,Grid} from 'semantic-ui-react';


import bed from '../../assets/landing-page/furniture/bed.png'
import chairs from '../../assets/landing-page/furniture/chairs.png'
import laptop from '../../assets/landing-page/accessories/laptop.png'
import mobile from '../../assets/landing-page/accessories/mobile.png'

class Products extends Component {
  

  

  render() {

     window.scrollTo(0,0);
    return (
      <div>
          <div className="ProductStyle" >

          <SearchFluid /> 
          
          
            <Container className="ProductContainerStyle">
                <Grid>
                
                       <Grid.Column computer={5} tablet={8} mobile={16}>
                       <ProductLi imageSrc={bed} />
                      </Grid.Column>

                      <Grid.Column computer={5} tablet={8} mobile={16}>
                        <ProductLi imageSrc={chairs} />
                      </Grid.Column>


                      <Grid.Column computer={5} tablet={8} mobile={16}>
                        <ProductLi imageSrc={bed}/>
                      </Grid.Column>

                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi imageSrc={bed}/>
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi imageSrc={bed}/>
                      </Grid.Column>

                       <Grid.Column computer={5} tablet={8} mobile={16}>
                        <ProductLi imageSrc={bed}/>
                      </Grid.Column>


                      <Grid.Column computer={5} tablet={8} mobile={16}>
                        <ProductLi imageSrc={mobile} />
                      </Grid.Column>

                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi imageSrc={laptop} />
                      </Grid.Column>
                      <Grid.Column computer={5} tablet={8} mobile={16}>
                          <ProductLi imageSrc={mobile} />
                      </Grid.Column>

                      
      

                              
                      
                </Grid>

            </Container>

           
                    
      
          </div>


          

          
      </div>
    );
  }
}

export default Products;
 