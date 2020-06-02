import React,{ Component } from "react";
import "./Test.css";
import { Table, Button,MenuItem } from "react-bootstrap";
import Select from 'react-select';
import { Link } from "react-router-dom";
// import {times} from 'lodash.times';
// import Page from './Page'

// const TOTAL_PER_PAGE = 5;

class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      continents :[],
      continent_name:'',
      continent_area:'',
      continent_area_rank:'',
      
    };

   
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event) {
    this.setState({name: event.target.value});
  }

  componentDidMount(){
  this.getContinents();
  }

  getContinents = _ => {
    fetch('/object/getcontinents',{
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

renderTableData() {
    return this.state.continents.map((continent, index) => {
       const { unique_continent_id, continent_name, continent_area, continent_area_rank } = continent //destructuring
       return (
          <tr key={unique_continent_id}>
             <td>{unique_continent_id}</td>
             <td><Link to={{pathname:`/continent/${continent_name}`}}> {continent_name} </Link></td>
             <td>{continent_area}</td>
             <td>{continent_area_rank}</td>
          </tr>
       )
    })
 }

  
  render() {
    let options = this.state.continents.map(function (key) {
      return {value: key.continent_name, label: key.continent_name};
    })
    const { continents } = this.state;

    return (
      <div className="Data_Class">
        <div className="container">
            <Select
                name="continent"
                value={this.state.value}
                options={options}
                onChange={this.handleOptionChange}
            />
         </div>
         <div className='container'>
         <Table responsive id='continents'>
                <thead>
                  <th>Continent ID</th>
                  <th>Continent Name</th>
                  <th>Continent Area</th>
                  <th>Continent Area Rank</th>
                </thead>
               <tbody>
                  {/* <tr>{this.renderTableHeader()}</tr> */}
                  {this.renderTableData()}
               </tbody>
            </Table>
         </div>
         
        </div>
    )
  }
}

export default Test