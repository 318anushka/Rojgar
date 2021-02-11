import React, { Component, useState, useEffect } from 'react'
import JobList from '../job/JobList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Dictaphone from './Voice'


class Dashboard extends Component {
  state = {
    searchTerm: '',
    location:'',
    type: ''
  }

  // handler= (val) => {
  //   this.setState({
  //     searchTerm: val
  //   })
  // }

  // handleChange= (evt) => {
  //   const value = evt.target.value;
  //   this.setState({
  //     ...this.state,
  //     [evt.target.name]: value
  //   });
  // }
  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }
  

  render() {
    const { jobs, auth, currentLocation, jobType, minSalary } = this.props;
    console.log("props" , this.props)
    console.log("minSal:", minSalary)
    if(!auth.uid) return <Redirect to='/signin'></Redirect>
    return (
      <div className=" dashboard background container">
        <div className='mrgtb-20'>
          <div className='row'>
              <div className='search'>
                <input type="text" placeholder="Looking for a job..." onChange={this.handleChange}></input>
              </div>
              <Dictaphone handler = {this.handler}></Dictaphone>
              </div>
          </div>
        <div className="row">
          <div className="col s12 m6">
            <JobList jobs={jobs} searchTerm={this.state.searchTerm}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications jobs={jobs} 
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state" , state)
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
)(Dashboard)