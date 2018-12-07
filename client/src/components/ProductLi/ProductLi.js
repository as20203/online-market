import React from 'react';
import './ProductLi.css';
import ButtonAnimated from './buttonAnimated';
import {Header} from 'semantic-ui-react'

 const productLi = (props)=>{

    return (
    
    
      <div className="scene">
       
          <div className="product" >
            <div className="picture" style={{backgroundImage:`url(${props.imageSrc})`}}></div>
            <div className="info" style={{overflow:'hidden'}}>
              <header>
                <Header as="h1" color={'grey'}>{props.name}</Header>
                <span> <ButtonAnimated pId={props._id}  /></span>
              </header>
              <p>
               {props.description}
              
              </p>
            </div>
          </div>
      </div>


);

  
 }
export default productLi;
 