import React, { Component, useState, useEffect } from 'react'
import JobList from '../job/JobList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Dictaphone from './Voice'
import { setUp, getCity, updateMinSalary, updateJobType } from "../../store/actions/jobAction";
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import Slider from '@material-ui/core/Slider';
import location from '../../images/currentLocation.png';
import job from '../../images/jobType.png';
import salary from '../../images/salary.png';
import next from '../../images/next.png';




class Setup extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      currentLocation: "",
      jobType: "",
      minSalary: ""
    }
    this.getCoordinates = this.getCoordinates.bind(this);
    this.setLocation = this.setLocation.bind(this);
  //  this.getCity = this.getCity.bind(this);
  }

  setLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.showError, {maximumAge:4000, timeout:1000, enableHighAccuracy:true});
    } else {
    // console.log("Geolocation is not supported by this browser.");
    }
  }

  getCoordinates(position){
    if(this.state.latitude == "" && this.state.longitude == ""){
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.props.getCity(this.state.latitude, this.state.longitude);
    return;
  }
   // console.log(this.state);
  }

  showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        break;
      case error.POSITION_UNAVAILABLE:
        break;
      case error.TIMEOUT:
        break;
      case error.UNKNOWN_ERROR:
        break;
    }
  }

  updateMinSalary = (e) => {
    this.props.updateMinSalary(e);
  }

  updateJobType = (e) => {
    console.log(e.target.value);
    this.props.updateJobType(e.target.value);
  }

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.id]: e.target.value
  //   })
  // }
  
  handleSubmit = (e) => {

    e.preventDefault();
    this.props.setUp(this.props.currentLocation, this.props.minSalary, this.props.jobType);
    this.props.history.push('/');
  }

  

  render() {
    const { currentLocation, minSalary, jobType } = this.props;
   // console.log(currentLocation);
    return(
        <div className='row-wrap'>
            <Card>
            <Image src={location} className='card-img'  ui={false} />
            <Card.Content>
            <Card.Header className='centre'>LOCATION</Card.Header>
            <Card.Description className='centre'>
            { currentLocation==""       
                    ? "Click below button to set current location for customized search"
                    : "Your Current Location is:"
            }
            </Card.Description>
            </Card.Content>     
            <Button className='centre' secondary onClick={this.setLocation()}>{ currentLocation!=""       
                    ? <div className='centre'>{currentLocation}</div>
                    : "Set Current Location"
            }</Button>
            </Card>

            <Card>
            <Image src={job} className='card-img' wrapped ui={false} />
            <Card.Content>
            <Card.Header className="centre">JOB TYPE</Card.Header>
            <Card.Meta className="centre">Please select favorable job type from below</Card.Meta>
            <Card.Description>
            <select class="ui dropdown" onChange={this.updateJobType}>
              <option value="">Select JobType</option>
              <option value="Plumber">Plumber</option>
              <option value="Farmer">Farmer</option>
              <option value="Worker">Worker</option>
              <option value="Driver">Driver</option>
              <option value="Cook">Cook</option>
            </select>
            </Card.Description>
            </Card.Content>
            </Card>

            <Card>
            <Image src={salary} className='card-img'  ui={false} />
            <Card.Content>
            <Card.Header>Daniel</Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Description>
            <Slider
              defaultValue={30}
              getAriaValueText={this.updateMinSalary}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={100}
              marks
              min={500}
              max={10000}
      />

            </Card.Description>
            </Card.Content>
            </Card>
            <img  style={{cursor: 'pointer'}} className='next-img' src={next} 
            onClick={this.handleSubmit}/>

        </div>
        
    )
  }
}

const mapStateToProps = (state) => {
 // console.log(state)
  return {
    currentLocation: state.firebase.profile.currentLocation,
    minSalary: state.firebase.profile.minSalary,
    jobType: state.firebase.profile.jobType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCity: (latitude, longitude) => dispatch(getCity(latitude, longitude)),
    updateMinSalary: (minSalary) => dispatch(updateMinSalary(minSalary)),
    updateJobType: (jobType) => dispatch(updateJobType(jobType)),
    setUp: (currentLocation, minSalary, jobType) => dispatch(setUp(currentLocation, minSalary, jobType))
  }
}
  

export default connect(mapStateToProps,mapDispatchToProps)(Setup)