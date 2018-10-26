import React, { Component } from 'react';
import './ProductLi.css';
import ButtonAnimated from './buttonAnimated';
import Background from '../../../assets/dummy-product/one.jpg';
class ProductLi extends Component {
  render() {
    return (
    
    
          <div className="scene">
           
              <div className="product" >
                <div className="picture" style={{backgroundImage:`url(${Background})`}}></div>
                <div className="info">
                  <header>
                    <h1>It's a Wonderful Life</h1>
                    <span className="year">1946 <ButtonAnimated /></span>
                  </header>
                  <p>
                    In Bedford Falls, New York on Christmas Eve, George Bailey is deeply troubled. Prayers for his well-being from friends and family reach Heaven. Clarence Odbody, Angel Second className, is assigned to visit Earth to save George, thereby earning his wings. Franklin and Joseph, the head angels, review George's life with Clarence.
                  </p>
                </div>
              </div>
          </div>


    );
  }
}

export default ProductLi;
 