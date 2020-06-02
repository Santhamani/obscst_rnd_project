import React, { Component } from "react";
import { Redirect } from "react-router-dom"



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          unique_continent_id:'',
          continent_name:'',
          continent_area:'',
          continent_area_rank:'',
    }
    const token = localStorage.getItem("token");
    let isLoggedIn = true;
    if(token === null){
        isLoggedIn = false
    }
    this.state = {
        isLoggedIn
    }
}

    componentDidMount(){
        this.getContinents()
    }

    // Continentss get method
  getContinents = _ => {
    fetch('/object/getcontinents',{
      method: 'GET', // or ‘PUT’
      // body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    // .then( res => this.setState({continents: res.data}))
    .then(({data}) => {
      console.log("continents",data)
    })
    .catch(err => console.log(err))
  }

    render(){
        if(this.state.isLoggedIn == false){
            return <Redirect to='/signup' />
        }
        return(
            <div>
                User Profile
            </div>
        )
    }

}
export default Profile;