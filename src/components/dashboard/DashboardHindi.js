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
    type: ''
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
      searchTerm: e.target.value
    })
  }
  

  render() {
    const { jobs, auth, currentLocation, jobType, minSalary } = this.props;

    if(!auth.uid) return <Redirect to='/signin'></Redirect>
    return (
      <div className=" dashboard background container">
        <div className='mrgtb-20'>
          <div className='row'>
              <div className='search'>
                <input type="text" value={this.state.searchTerm} placeholder="कुछ टाइप करें " onChange={this.handleChange}></input>
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
            <JobList jobs={jobs} searchTerm={this.state.searchTerm}/>
          </div>
          <div className="col s12 m4 offset-m1">
            <Notifications jobs={jobs} 
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
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