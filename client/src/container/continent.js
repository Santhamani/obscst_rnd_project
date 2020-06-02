import React,{ Component } from "react";
import "./Test.css";
import { Route, Switch, useParams, Link } from "react-router-dom";
import { Button, Modal, Row, Col } from "react-bootstrap";
import Select from 'react-select';
import axios from 'axios';

class Continent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      continents : [],
      continent_name :''
    };

    this.handleClose = this.handleClose.bind(this);
    this.deleteContinentByName = this.deleteContinentByName.bind(this);
  }

  handleClose() {
    this.setState({ show: true });
  }

  componentDidMount(){
    this.getContinentByName();
    
  }

  getContinentByName = _ => {
    // var name = this.props.match.params.name;
    // const data = {}
    const name = this.props.match.params.name
    fetch(`/object/getcontinents/continent/${name}`,{
      method: 'GET', // or ‘PUT’
      // body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => this.setState({continents: res.data}))
    // .then(({data}) => {
    //   console.log(data)
    // })
    .catch(err => console.log(err))
  }

  deleteContinentByName = _ => {
    // var name = this.props.match.params.name;
    const data = { continent_name: this.state.continent_name }
    const name = this.props.match.params.name
    fetch(`/object/getcontinents/continent/${name}`,{
      method: 'POST', // or ‘PUT’
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => this.setState({continents: res.data}))
    // .then(({data}) => {
    //   console.log(data)
    // })
    .catch(err => console.log(err))
  }

  renderContinentNames = ({unique_continent_id, continent_name, continent_area_rank, continent_area}) => <div key={unique_continent_id}> {unique_continent_id}.){continent_name} {continent_area} {continent_area_rank}</div>

  render() {
    console.log("props",this.props);
    const {continents } = this.state
    return (
      <div className="Data_Class">
        <div className="container">
        <Row>
          <Col sm={6}>
          {continents.map(this.renderContinentNames)}
          </Col>
          <Col>
            <Link to='/test'><Button onClick={this.deleteContinentByName}>Delete</Button></Link>
            {/* <Button onClick={this.deleteContinentByName}>Delete</Button> */}
          </Col>
        </Row>
        </div>
        {/* <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                {continents.map(this.renderContinentNames)}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal> */}
      
        </div>
    )
  }
}

export default Continent