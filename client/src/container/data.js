import React,{ Component } from "react";
import "./data.css";
import { Grid, Col, Row, Button, FormGroup, FormControl, ControlLabel, Checkbox, SplitButton, MenuItem, DropdownButton } from "react-bootstrap";
import Select from 'react-select';
// import 'react-select/dist/react-select.css';

// import options from './options';
// import SelectSearch from 'react-select-search';


class Data extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      unique_continent_id:'',
      continent_name:'',
      continent_area:'',
      continent_area_rank:'',

      unique_country_id:'',
      country_area:'',
      country_area_rank:'',
      country_rank_id:'',
      country_name:"",

      unique_state_id:"",
      state_name:"",
      state_area:"",
      state_area_rank:"",
      state_area_rank_id:"",

      unique_district_id:"",
      district_name:"",
      district_area:"",
      district_area_rank:"",
      district_area_rank_id:"",

      selectedOption:'',
      states:[], countries:[],continents:[],districts:[],
      state:null,continent:null,district:null,country:null,
    };


    this.handleConIdChange = this.handleConIdChange.bind(this);
    this.handleConNameChange = this.handleConNameChange.bind(this);
    this.handleConAreaChange = this.handleConAreaChange.bind(this);
    // this.handleConAreaRankChange = this.handleConAreaRankChange.bind(this);

    this.handleCountryIdChange = this.handleCountryIdChange.bind(this);
    this.handleCountryNameChange = this.handleCountryNameChange.bind(this);
    this.handleCountryAreaChange = this.handleCountryAreaChange.bind(this);

    this.handleStateIdChange = this.handleStateIdChange.bind(this);
    this.handleStateNameChange = this.handleStateNameChange.bind(this);
    this.handleStateAreaChange = this.handleStateAreaChange.bind(this);

    this.handleDistrictIdChange = this.handleDistrictIdChange.bind(this);
    this.handleDistrictNameChange = this.handleDistrictNameChange.bind(this);
    this.handleDistrictAreahange = this.handleDistrictSubmit.bind(this);

    // Forms
    this.handleContinentSubmit = this.handleContinentSubmit.bind(this);
    this.handleCountrySubmit=this.handleCountrySubmit.bind(this);
    this.handleStateSubmit=this.handleStateSubmit.bind(this);
    this.handleDistrictSubmit=this.handleDistrictSubmit.bind(this);
    
  }

  
  handleConIdChange(event) {
    this.setState({unique_continent_id: event.target.value});
  }
  handleConNameChange(event) {
    this.setState({continent_name: event.target.value});
  }
  handleConAreaChange(event){
    this.setState({continent_area: event.target.value});
  }
  handleConAreaRankChange(event){
    this.setState({continent_area_rank: event.target.value});
  }
  handleCountryNameChange(event){
    this.setState({country_name:event.target.value});
    // this.setState({states : this.state.countries.find(cntry => cntry.name === event.target.value).states});
  }
  handleCountryAreaChange(event){
    this.setState({country_area: event.target.value})
  }
  handleCountryIdChange(event){
    this.setState({unique_country_id:event.target.value});
  }
  handleStateIdChange(event){
    this.setState({unique_state_id:event.target.value});
  }
  handleStateNameChange(event){
    this.setState({state_name:event.target.value});
  }
  handleStateAreaChange(event){
    this.setState({state_area:event.ta.state_area});
  }
  handleDistrictIdChange(event){
    this.setState({unique_district_id:event.target.value});
  }
  handleDistrictNameChange(event){
    this.setState({district_name:event.target.value});
  }
  handleDistrictAreahange(event){
    this.setState({district_area:event.target.value});
  }
  // handleSChange = ({ target }) => {
  //   this.setState({
  //     selectedOption: target.value
  //   })
  // }

  componentDidMount(){
    this.getContinents();
    this.getCoutries();
    this.getStates();
    this.getDistricts();
  }


  // Continentss get method
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

  // Countries get method
  getCoutries = _ => {
    fetch('/object/getcountries',{
      method: 'GET', // or ‘PUT’
      // body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => this.setState({countries: res.data}))
    // .then(({data}) => {
    //   console.log(data)
    // })
    .catch(err => console.log(err))
  }

  // States get method
  getStates = _ => {
    fetch('/object/getstates',{
      method: 'GET', // or ‘PUT’
      // body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => this.setState({states: res.data}))
    // .then(({data}) => {
    //   console.log(data)
    // })
    .catch(err => console.log(err))
  }

  // Districts get method
  getDistricts = _ => {
    fetch('/object/getdistricts',{
      method: 'GET', // or ‘PUT’
      // body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => this.setState({districts: res.data}))
    // .then(({data}) => {
    //   console.log(data)
    // })
    .catch(err => console.log(err))
  }


  renderContinentNames = ({unique_continent_id, continent_name, continent_area_rank, continent_area}) => <div key={unique_continent_id}> {unique_continent_id}.){continent_name} {continent_area} {continent_area_rank}</div>

  renderCountryNames = ({unique_country_id, country_name, country_area_rank, country_area, country_rank_id}) => <div key={unique_country_id}> {unique_country_id}.){country_name} {country_area} {country_area_rank} {country_rank_id} </div>

  renderStateNames = ({unique_state_id, state_name, state_area, state_area_rank, state_area_rank_id}) => <div key={unique_state_id}> {unique_state_id}.){state_name} {state_area} {state_area_rank} {state_area_rank_id} </div>

  renderDistrictNames = ({unique_district_id, district_name, district_area, district_area_rank, district_area_rank_id}) => <div key={unique_district_id}> {unique_district_id}.){district_name} {district_area} {district_area_rank} {district_area_rank_id} </div>

// Countinent post method
handleContinentSubmit(event) {
  // alert('A name was submitted: ' +this.state.continent_name+this.state.continent_area+this.state.continent_area_rank);
  // console.log(this.state.continent_name);
  const data = {continent_name:this.state.continent_name, continent_area:this.state.continent_area, continent_area_rank:this.state.continent_area_rank}
  fetch('object/getcontinents/addcontinent',{
    method: 'POST', // or ‘PUT’
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{ 'Content-Type': 'application/json' }
  })
  // .then(res => res.json())
  // .then(({data}) => {
  //   console.log(data)
  // })
  .then(this.getContinents)
  .catch(err => console.error(err)
  .then(response => console.log('Success:', response)));

  event.preventDefault();
}

  // COuntry post method
  handleCountrySubmit(event) {
    // alert('A name was submitted: ' + this.state.country_name+this.state.continent_id);
    // console.log(this.state.country_name+'_'+this.state.continent_id);
    const data = {country_name:this.state.country_name,unique_continent_id:this.state.unique_continent_id,country_area:this.state.country_area, country_area_rank:this.state.country_area_rank,country_rank_id:this.state.country_rank_id}
    fetch('object/getcountries/addcountry',{
      method: 'POST', // or ‘PUT’
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    // .then(res => res.json())
    // .then(({data}) => {
    //   console.log(data)
    // })
    .then(this.getCoutries)
    .catch(err => console.error(err)
    .then(response => console.log('Success:', response)));

    event.preventDefault();
  }

  // State post method
  handleStateSubmit(event) {
    // alert('A name was submitted: ' + this.state.state_name+this.state.country_id);
    // console.log(this.state.state_name+'_'+this.state.country_id);
    const data = {state_name:this.state.state_name,unique_country_id:this.state.unique_country_id,state_area:this.state.state_area,state_area_rank:this.state.state_area_rank,state_area_rank_id:this.state_area_rank_id}
    fetch('object/getstates/addstate',{
      method: 'POST', // or ‘PUT’
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    // .then(res => res.json())
    // .then(({data}) => {
    //   console.log(data)
    // })
    .then(this.getStates)
    .catch(err => console.error(err)
    .then(response => console.log('Success:', response)));

    event.preventDefault();
  }

  // District post method
  handleDistrictSubmit(event) {
    // alert('A name was submitted: ' + this.state.state_id+ this.state.district_name);
    // console.log(this.state.state_id+ this.state.district_name);
    const data ={district_name:this.state.district_name,unique_state_id:this.state.unique_state_id,district_area:this.state.district_area, district_area_rank:this.state.district_area_rank,district_area_rank_id:this.state.district_area_rank_id}
    fetch('object/getdistricts/adddistrict',{
      method: 'POST', // or ‘PUT’
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    // .then(res => res.json())
    // .then(({data}) => {
    //   console.log(data)
    // })
    .then(this.getDistricts)
    .catch(err => console.error(err)
    .then(response => console.log('Success:', response)));

    event.preventDefault();
  }

  render() {
    const { continents,countries,states,districts } = this.state;
    return (
      <div className="Data_Class">
    <Grid>
      <Row>
        {/* Continents */}
        <Col xs={6} md={3}>
          <div className="Continents_Class">
            Continents
            <div>
              {continents.map(this.renderContinentNames)}
            </div>
            <form onSubmit={this.handleContinentSubmit}>
              <FormGroup>
                <ControlLabel>Continents Name</ControlLabel>
                <FormControl 
                  autoFocus
                  type="text"
                  value={this.state.continent_name} onChange={this.handleConNameChange}
                />
              </FormGroup>
              <FormGroup>
               <ControlLabel>Continents Area</ControlLabel>
                <FormControl 
                  autoFocus
                  type="text"
                  value={this.state.continent_area} onChange={this.handleConAreaChange}
                />
              </FormGroup>
              {/* <FormGroup>
              <ControlLabel>Continents Area Rank</ControlLabel>
                <FormControl 
                  autoFocus
                  type="text"
                  value={this.state.continent_area_rank} onChange={this.handleConAreaRankChange}
                />
              </FormGroup> */}
              <FormGroup>
                <FormControl autoFocus type="Submit" value="Submit"/>
              </FormGroup>
            </form>
          </div>
        </Col>

         {/* Country */}
        <Col xs={6} md={3}>
          <div className="Country_Class">
            Country
            <div>
              {countries.map(this.renderCountryNames)}
            </div>
            <form onSubmit={this.handleCountrySubmit}>
              <FormGroup>
                <ControlLabel>Country Name:</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.country_name} onChange={this.handleCountryNameChange}
              />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Country Area:</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.country_area} onChange={this.handleCountryAreaChange}
              />
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select Continent</ControlLabel>
                <FormControl componentClass="select" placeholder="select" value={this.state.unique_continent_id}
                onChange={this.handleConIdChange} >
                  {continents.map(({ unique_continent_id, continent_name }) => <option value={unique_continent_id} >{continent_name } </option>)}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl autoFocus type="Submit" value="Submit"/>
              </FormGroup>
              {/* <select
                value={this.state.selectedOption}
                onChange={this.handleOptionChange}
                >
              {continents.map(({ id, name }) => <option value={id} >{name}</option>)}
              </select> */}
            </form>
          </div>
        </Col>
         

        {/* States */}
        <Col xs={6} md={3}>
          <div className="States_Class">
            State
            <div>
              {states.map(this.renderStateNames)}
            </div>
            <form onSubmit={this.handleStateSubmit}>
              <FormGroup>
                <ControlLabel>State Name</ControlLabel>
                <FormControl 
                autoFocus
                type="text"
                value={this.state.state_name} onChange={this.handleStateNameChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>State Area</ControlLabel>
                <FormControl 
                autoFocus
                type="text"
                value={this.state.state_area} onChange={this.handleStateAreaChange}
                />
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select Country</ControlLabel>
                <FormControl componentClass="select" placeholder="select" value={this.state.unique_country_id}
                onChange={this.handleCountryIdChange}>
                  {countries.map(({ unique_country_id, country_name }) => <option value={unique_country_id} >{country_name}</option >)}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl autoFocus type="Submit" value="Submit"/>
              </FormGroup>
              
              {/* <select
                value={this.state.selectedOption}
                onChange={this.handleOptionChange}
                >
              {countries.map(({ id, name, address }) => <option value={id} >{name}</option>)}
              </select> */}
            </form>
          </div>
        </Col>

        {/* District */}
        <Col xs={6} md={3}>
          <div className="District_Class">
            District
            <div>
              {districts.map(this.renderDistrictNames)}
            </div>
            <form onSubmit={this.handleDistrictSubmit}>
              <FormGroup>
                <ControlLabel>District Name</ControlLabel>
                <FormControl autoFocus type="text" value={this.state.district_name} onChange={this.handleDistrictNameChange}/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>District Area</ControlLabel>
                <FormControl autoFocus type="text" value={this.state.area} onChange={this.handleDistrictAreaChange}/>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select State</ControlLabel>
                <FormControl componentClass="select" placeholder="select" value={this.state.unique_state_id}
                onChange={this.handleStateIdChange}>
                  {states.map(({ unique_state_id, state_name }) => <option value={unique_state_id}>{state_name}</option >)}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormControl autoFocus type="Submit" value="Submit"/>
              </FormGroup>
              
              {/* <select
                value={this.state.selectedOption}
                onChange={this.handleOptionChange}
                >
              {states.map(({ id, name, address }) => <option value={id} >{name}</option>)}
              </select> */}
            </form>
          </div>
        </Col>
      </Row>
    </Grid>
       

    </div>
    );
  }

}

export default Data