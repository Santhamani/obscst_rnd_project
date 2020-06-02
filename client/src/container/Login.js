import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import "./Login.css";
import {login} from './userFunctions'

class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      uname: '',
      password: '',
      email: '',
    }

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this)

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

  }

  setEmail(event){
    this.setState({email:event.target.value})
  }

  setPassword(event){
    this.setState({password: event.target.value})
  }
   
  handleLoginSubmit(event) {
    // const data = {
    //   email : this.state.email,
    //   password: this.state.password
    // }
    // const reqOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   // body: JSON.stringify(data)
    // };
    // fetch('http://localhost:8080/login', reqOptions)
    // .then(response => {
    //     const data = response.json();
    //     // check for error response
    //     if (!response.ok) {
    //         // get error message from body or default to response status
    //         const error = (data && data.message) || response.status;
    //         return Promise.reject(error);
    //     } else {
    //       this.props.history.push(`/profile`)
    //     }

    //     this.setState({ postId: data.id })
    // })
    // .then(response => {
    //   localStorage.setItem('usertoken', response.data)
    //   return response.data
    // })
    // .catch(error => {
    //     this.setState({ errorMessage: error.toString() });
    //     console.error('There was an error!', error);
    // });

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
        this.props.history.push(`/profile`)
      }
    })

  event.preventDefault();
  }

  validateForm(){
    const { email, password} =this.state;
    return  email.length > 0 && password.length > 0;
  }

render(){
  const { email, password, uname} = this.state
const isEnabled = this.validateForm();
  return (
    <div className="Login">
        <form onSubmit={this.handleLoginSubmit}>
            <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={this.setEmail}
            />
            </FormGroup>
            <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl
                value={password}
                onChange={this.setPassword}
                type="password"
            />
            </FormGroup>
            <FormGroup controlId="rememberme">
            <Checkbox>Remeber Me</Checkbox>
            </FormGroup>
            <Button block bsSize="large" disabled={!isEnabled} type="submit">
            Login
            </Button>
        </form>
    </div>
  );
}
}

export default Login