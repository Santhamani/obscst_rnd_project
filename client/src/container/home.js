import React, { Component } from "react";
import "./home.css";
import logo from '../logo.jpg';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={apiRes:""}
  }
  
  callApi(){
    fetch('http://localhost:8080/users')
    .then(res => res.text())
    .then(res => this.setState({apiRes: res}));
  }

  componentWillMount(){
    this.callApi()
  }
  render(){
    return (
      <div className="Home">
        <div className="lander">
          <h1>Haindava Sakthi</h1>
          <img src={logo} className="App-logo" alt="logo" width="50%"/>
          <h3>హిందూ ధర్మరక్షణ , భారతదేశ రక్షణే హైందవశక్తి ధ్యేయం</h3>
          <p>{this.state.apiRes}</p>
        </div>
      </div>
    );
  }
  
}


export default App