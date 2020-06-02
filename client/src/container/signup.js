
import React,{ Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './signup.css'
import { render } from "react-dom";
import { Link, Redirect } from "react-router-dom";


class SignUp extends React.Component{

    constructor(props){
        let isLoggedIn = false;
        super(props)
        this.state = {
            fname: '',
            lname: '',
            email :'',
            password:'',
            uname : '',
            phoneno : '1234567890',
            otp: '',
        }   

        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPhoneNo = this.setPhoneNo.bind(this);
        this.setUname = this.setUname.bind(this);
        this.setOtp = this.setOtp.bind(this);

        // this.validateForm = this.validateForm.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleOtp = this.handleOtp.bind(this);
    }

    setFirstName(event){
        this.setState({fname: event.target.value});
    }
    setLastName(event){
        this.setState({lname: event.target.value});
    }
    setEmail(event){
        this.setState({email: event.target.value});
    }
    setPassword(event){
        this.setState({password: event.target.value});
    }
    setPhoneNo(event){
        this.setState({phoneno:event.target.value})
    }
    setUname(event){
        this.setState({uname: event.target.value})
        console.log(event.target.value);
    }
    setOtp(event){
        this.setState({otp:event.target.value})
    }

    handleFormSubmit(event){
        const data = {  
                        // fname:this.state.fname, 
                        // lname:this.state.lname, 
                        email:this.state.email,
                        // password:this.state.password,
                        // uname: this.state.uname,
                        phoneno: this.state.phoneno,
                    }
        const { email, phoneno } =this.state;
        localStorage.setItem('email', email);
        // console.log("local",  localStorage.setItem('email',email))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/users/getotp', requestOptions)
            .then(response => {
                const data = response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
                this.setState({ email: data.email })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
        
          event.preventDefault();
    }

    handleOtp(event){
        const lemail = localStorage.getItem('email');
        const { email, otp } = this.state;
        localStorage.setItem('otp', otp);
        const lotp = localStorage.getItem('otp');
        const data = {  
            mail:lemail,
            otp:lotp
        }
        console.log("mail, otp", lemail, lotp)
        const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/users/login', reqOptions)
        .then(response => {
            const data = response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            localStorage.setItem("token","jkhkhkjhsiuyeiqwe8q37")
            this.setState({
                isLoggedIn: true
            })
            this.setState({ otp: data.otp })
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        event.preventDefault();
    }

    // validateForm(){
    //     const {email} = this.state;
    //     return email.length > 0 ;
    // }
    

render(){
    if(this.state.isLoggedIn){
        return <Redirect to='/profile' />
    }
    // const { email, fname, uname, password} = this.state;
    // const isEnabled = email.length > 0 && password.length > 0 && uname.length > 0 && fname.length > 0;
    // const isEnabled = this.validateForm();
        return (
            <div className="Signup">
            <form>
            <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={this.setEmail}
                />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                <Button bsSize="small" pullRight type="submit" onClick={this.handleFormSubmit}>
                    Get Otp
                </Button>
                <br></br>
                <ControlLabel>OTP</ControlLabel>
                <FormControl
                    autoFocus
                    type="text"
                    value={this.state.otp}
                    onChange={this.setOtp}
                />
                </FormGroup>
                <Button block bsSize="large" type="submit" onClick={this.handleOtp}>
                    Sign Up
                </Button>
            </form>
            </div>
        );
    }
}  
export default SignUp