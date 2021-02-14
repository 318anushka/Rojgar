import React, { Component, useState, useEffect } from 'react'
import JobList from '../job/JobList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Dictaphone from './Voice'
import { Image } from 'semantic-ui-react'
import rights from '../../images/rights.png';
import { Link } from 'react-router-dom'


class DashboardHindi extends Component {
  state = {
    searchTerm: '',
    location:'',
    jobType: ''
  }

  handler= (val) => {
    this.setState({
      searchTerm: val
    })
    console.log(this.state.searchTerm)
  }

  // handleChange= (evt) => {
  //   const value = evt.target.value;
  //   this.setState({
  //     ...this.state,
  //     [evt.target.name]: value
  //   });
  // }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  //  console.log(this.state)

  }

  clearFilters = () =>{
    this.setState({
      location:"",
      jobType:""
    })
  }

  render() {
    const { jobs, auth } = this.props;

    if(!auth.uid) return <Redirect to='/signin'></Redirect>
    return (
      <div className='row'>
        <div className='background column mrgt-145'>
        <h4 className=" col s12 m11 left">फिल्टर:</h4>
          <select class="ui dropdown col s12 m11 left" id="location"  value={this.state.location} onChange={this.handleChange}>
              <option value="">जगह चुने </option>
              <option value="Mumbai">Mumbai</option>
              <option value="Noida">Noida</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Rewa">Rewa</option>
              <option value="Surat">Surat</option>
          </select>
          <select class="ui dropdown col s12 m11 left mrgtb-20" id="jobType"  value={this.state.jobType} onChange={this.handleChange}>
              <option value="">जॉब टाइप </option>
              <option value="Plumber">Plumber</option>
              <option value="Farmer">Farmer</option>
              <option value="Worker">Worker</option>
              <option value="Driver">Driver</option>
              <option value="Cook">Cook</option>
          </select>
          <button className="btn pink lighten-1 z-depth-0 col s12 m11 left" onClick={this.clearFilters}>क्लियर </button>      

        </div>
      <div className=" dashboard background container">
        <div className='mrgtb-20'>
          <div className='row'>
              <div className='search'>
                <input type="text" id="searchTerm" value={this.state.searchTerm} placeholder="कुछ टाइप करें ..." onChange={this.handleChange}></input>
              </div>
              <Dictaphone handler = {this.handler}></Dictaphone>
              <div>
            <div className='centre'>
            <Image onClick={event =>  window.location.href='/rights'} src={rights} className='rights-img pdt-20' style={{cursor: 'pointer'}}
            wrapped ui={true} />
            <div className='mrgt-15'>अपने अधिकार जानें </div>
            </div>
          </div>
          </div>
          </div>
        <div className="row">
          <div className="col s12 m7">
            <JobList jobs={jobs} searchTerm={this.state.searchTerm} location={this.state.location} jobType={this.state.jobType}/>
          </div>
          <div className="col s12 m4 offset-m1">
            <Notifications jobs={jobs} 
            />
          </div>
          
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 // console.log("state" , state)
  return {
    jobs: state.firestore.ordered.jobs,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    currentLocation: state.firebase.profile.currentLocation,
    jobType: state.firebase.profile.jobType,
    minSalary: state.firebase.profile.minSalary
  }
}
  

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'jobs' },
    { collection: 'users' }
    
  ])
)(DashboardHindi)