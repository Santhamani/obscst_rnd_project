import React, { Profiler } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Link, Route, Switch } from "react-router-dom";
import { Tab,Row,Col, Nav, Navbar, MenuItem, NavItem, NavDropdown } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
import Routes from "./route";
import $ from "jquery";
import Profile from "./container/profile";

class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
  return (
   <div className="App" >
     <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Haindava Sakthi</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {/* <NavItem eventKey={1} href="#">
              Link
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link
            </NavItem> */}
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/data">
              Object
            </NavItem>
            <NavItem eventKey={2} href="/test">
              Subject
            </NavItem>
            <NavItem eventKey={2} href="/signup">
              Sign Up
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/profile">Profile</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="tab-place">
      <Row className="clearfix">
        <Col sm={2}>
          <Nav bsStyle="tabs" stacked>
            <NavItem eventKey="first">Home</NavItem>
            <NavItem eventKey="second">Sign Up</NavItem>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content animation>
            <Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>
            <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container> */}
       <Routes />
   </div>
  );
  }
}

export default App;
