import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


class Notifications extends Component {
  
  // const array = Array.from(jobs.jobs);
  // array.sort((a,b) => b.createdAt - a.createdAt);
  // console.log("array :", array)
  render(){
    const { jobs, currentLocation, jobType, minSalary } = this.props;
    console.log("Noti prop" ,this.props)
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users">
            {jobs && jobs.filter(val => {
              if(jobType == "" && minSalary == "" && currentLocation == ""){
                return val;
              }
              else if((jobType.toLowerCase() == val.title.toLowerCase() || minSalary <= val.salary) ||
              currentLocation.toLowerCase() == val.location.toLowerCase() 
              ){
                return val;
              }
            }).map(item =>{
              return <Link to={'/job/' + item.id} key={item.id}>
              <li key={item.id}>
                <span className="pink-text">{item.content}New Job Posted for: </span>
                <span> {item.title}</span>
                <div className="note-date grey-text">{moment(item.createdAt.toDate()).fromNow()}</div>
              </li></Link>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
}


const mapStateToProps = (state) => {
  console.log("state in noti:" , state)
  return {
    currentLocation: state.firebase.profile.currentLocation,
    jobType: state.firebase.profile.jobType,
    minSalary: state.firebase.profile.minSalary
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users' },
    
  ])
)(Notifications)
// export default Notifications

