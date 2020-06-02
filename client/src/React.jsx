import React from 'react';
import logo from './logo.svg';
import './App.css';

class Reacts extends React.Component {
    constructor(){
        super();
        // this.state = {
        //     header : " THis is Header.....",
        //     content: " THis is Content......"
        // }
        this.state = {
            header:"this is header",
            content: "this is content",
            data : 
            [
                {
                    "name": 'aa',
                    "email": 'aa@gmail.com',
                    "school": 'aaaa'
                },
                {
                    "name": 'bb',
                    "email": 'bb@gmail.com',
                    "school": 'bbbb'
                },
                {
                    "name": 'cc',
                    "email": 'cc@gmail.com',
                    "school": 'cccc'
                },
            ]
        }
    }
    render(){
        var i = 1;
        var myStyle = {
            color : 'red',
            // font-size : '100'
        }

        return(
            <div>
                <img src={logo} className="App-logo" alt="App Logo"></img>
                <h1 style = {myStyle}>Hello World</h1>
                {/* <h2>Header</h2> */}
                {/* <h3>Content....</h3> */}
                <Header />
                <Content />
                {/* <State /> */}
                {22+22}
                <h1> { i===1 ? 'true' : 'false' }</h1>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>School</th>
                    </tr>
                    <tbody>
                        {this.state.data.map((person,i) => <TableRow key={i} data={person}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}
class Header extends React.Component {
    render() {
        return(
            <div>Header!!!!</div>   
        );
    }
}
class Content extends React.Component {
    render(){
        return(
            <div>Content....</div>
        //   {this.state.props.header}
        );
    }
}
class TableRow extends React.Component {
    render(){
        return(
            
            <tr>
                <th>{this.props.data.name}</th>
                <th>{this.props.data.email}</th>
                <th>{this.props.data.school}</th>
            </tr>
            
        )
    }
}
// class State extends React.Component {
//     render() {
//         return(
//             <div>
//                 {this.state.header}
//                 {this.state.content}
//             </div>
//         )
//     }
// }
export default Reacts;
