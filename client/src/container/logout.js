import React,{ Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";


class Logout extends Component {

    constructor(props){
        super(props)
        localStorage.removeItem("token");
    }
    render(){
        return(
            <div>
            <p>You have been Logout</p>
           <Link to="/signup">Login Again</Link>
           </div>
        )
    }
}
export default Logout