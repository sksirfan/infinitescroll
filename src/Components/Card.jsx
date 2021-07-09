import React, { Component } from "react";
class Card extends Component {
  render(){
    return (       
            <div className='cardCss'>
            <h1>{this.props.card.id}</h1>   
            <h1 className='countCss'>Title : {this.props.card.title}</h1>            
            </div>  
    );
  }        
}

export default Card;