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
                <div className="info" style={{overflow:'hidden'}}>
                  <header>
                    <Header as="h1" color={'brown'}>{this.props.name}</Header>
                    <span> <ButtonAnimated pId={this.props._id}  /></span>
                  </header>
                  <p>
                   {this.props.description}
                  
                  </p>
                </div>
              </div>
          </div>


    );
  }
}

export default ProductLi;
 