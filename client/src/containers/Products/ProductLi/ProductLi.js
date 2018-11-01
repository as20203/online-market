import React, { Component } from 'react';
import './ProductLi.css';
import ButtonAnimated from './buttonAnimated';
import {Header} from 'semantic-ui-react'
class ProductLi extends Component {
  render() {
    return (
    
    
          <div className="scene">
           
              <div className="product" >
                <div className="picture" style={{backgroundImage:`url(${this.props.imageSrc})`}}></div>
                <div className="info">
                  <header>
                    <Header as="h1" color={'brown'}>Our Product</Header>
                    <span> <ButtonAnimated  /></span>
                  </header>
                  <p>
                  A product description is the marketing copy that 
                  explains what a product is and why it's worth purchasing. 
                  The purpose of a product description is to supply customers 
                  with details around the features and benefits of the product so they're compelled to buy.
                  
                  </p>
                </div>
              </div>
          </div>


    );
  }
}

export default ProductLi;
 