import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

class Cards extends Component {
  constructor() {
    super();
    //default state with empty cards
    this.state = {
      cards: [],
      loading: false,
      start: 0,
      prevY: 0,
      page:1
    };
  }

  render(){
      // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    return (

      <div className="container">
          <div className="listHdng"> List Of Cards </div>   
          {this.state.cards.map(list => (
            <Card card = {list} ></Card>            
          ))}
      <div className="loadingCSS"
          ref={loadingRef => (this.loadingRef = loadingRef)}
          // style={loadingCSS}
      >
      <span style={loadingTextCSS}>Loading...</span>
      </div>
      <div className="pgnIcon">{this.state.page}</div>
      </div>
    );
  }
  componentDidMount() {
    //first set of data loaded to state
    this.getCards(this.state.start);
    var options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      };
      
      this.observer = new IntersectionObserver(
        this.handleObserver.bind(this),
        options
      );
      this.observer.observe(this.loadingRef);
    }
//constructor , default state
//didMount ,one time call , this is used to add an observer , what to observe
//getCard responsibility is to take startNo , and call api 
//second time, scroll 1 , 10 records in state already
  getCards(start) {
    this.setState({ loading: true });
    console.log('about to get posts'+start);   
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`
        )
      .then(res => {
        this.setState({ cards: [...this.state.cards, ...res.data] });
        this.setState({ loading: false });
      });
    }
      
        handleObserver(entities, observer) {
            const y = entities[0].boundingClientRect.y;
            if (this.state.prevY > y) {
              const curPageLength = this.state.cards.length ;
              //first 10, 
              this.getCards(curPageLength);
              //set next page number
              this.setState({ page: this.state.page+(curPageLength/10) });
            }
            this.setState({ prevY: y });
        }
}

export default Cards;