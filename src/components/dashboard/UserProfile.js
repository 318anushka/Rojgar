import React, { Component, useState, useEffect } from 'react'
import JobList from '../job/JobList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { setUp } from "../../store/actions/jobAction";


class UserProfile extends Component {
  state = {
    firstName:this.props.profile.firstName,
    lastName: this.props.profile.lastName,
    currentLocation:this.props.profile.currentLocation,
    minSalary:this.props.profile.minSalary,
    jobType:this.props.profile.jobType
  }


    handleChange = (e) => {
        this.setState({
        [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.setUp(this.state.currentLocation,this.state.minSalary, this.state.jobType);
        this.props.history.push('/');
    } 
  

  render() {
    const { auth, profile} = this.props;

    if(!auth.uid) return <Redirect to='/signin'></Redirect>
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Update Details</h5>
          <div className="input-field row ">
              <p  className='mrg-5 centre blue-text text-darken-3'>FirstName:</p>
            <input defaultValue={profile.firstName} type="text" id='firstName' onChange={this.handleChange} />
            <label htmlFor="title"></label>
          </div>
          <div className="input-field row ">
              <p  className='mrg-5 centre blue-text text-darken-3'>LastName:</p>
            <textarea id="lastName" defaultValue={profile.lastName} className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content"></label>
          </div>
          <div className="input-field row ">
              <p  className='mrg-5 centre blue-text text-darken-3'>Location:</p>
            <input type="text" id='currentLocation' defaultValue={profile.currentLocation} onChange={this.handleChange} />
            <label htmlFor="title"></label>
          </div>
          <div className="input-field row ">
              <p  className='mrg-5 centre blue-text text-darken-3'>MinimumSalary:</p>
            <input type="text" id='minSalary' defaultValue={profile.minSalary} onChange={this.handleChange} />
            <label htmlFor="salary"></label>
          </div>
          <div className="input-field row ">
              <p  className='mrg-5 centre blue-text text-darken-3'>JobType:</p>
            <input type="text" id='jobType' defaultValue={profile.jobType} onChange={this.handleChange} />
            <label htmlFor="contact"></label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Update Details</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 // console.log("state" , state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = dispatch => {
    return {
        setUp: (currentLocation, minSalary, jobType) => dispatch(setUp(currentLocation, minSalary, jobType))
    }
  }
  

export default compose(
  connect(mapStateToProps,mapDispatchToProps
))(UserProfile)