import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MicIcon from '@material-ui/icons/Mic';

class Notifications extends Component {
  state = {
    visible: true
  }

  toggleMenu = () =>{
    this.setState({
      visible: !(this.state.visible)
    })
  }
  
  // const array = Array.from(jobs.jobs);
  // array.sort((a,b) => b.createdAt - a.createdAt);
  // console.log("array :", array)
  render(){
    const { jobs, currentLocation, jobType, minSalary } = this.props;
    const url = window.location.pathname;
    console.log("Noti", this.props)
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <div className='row'>
            <span className="card-title mrgl-5">{ url.includes("hindi")       
                      ? "नई सूचना "
                      : "Notifications"
              }</span>
              {this.state.visible ? <KeyboardArrowDownIcon className="icon" onClick={this.toggleMenu}></KeyboardArrowDownIcon> : <ExpandLessIcon className="icon" onClick={this.toggleMenu}></ExpandLessIcon>}
          </div>
          {!this.state.visible ?
            <ul className="online-users">
              {jobs && jobs.filter(val => {
                if(jobType == "" && minSalary == "" && currentLocation == ""){
                  return val;
                }
                else if((jobType.toLowerCase().includes(val.title.toLowerCase()) && val.salary >= minSalary) &&
                (currentLocation.toLowerCase() == val.location.toLowerCase() || currentLocation.toLowerCase() == "")
                ){
                  return val;
                }
              }).map(item =>{
                return <Link to={'/job/' + item.id} key={item.id}>
                <li key={item.id}>
                  <span className="pink-text">{ url.includes("hindi")       
                      ? "नई जॉब उपलब्ध: "
                      : "New Job Posted For:"
              }</span>
                  <span> {item.title}</span>
                  <div className="note-date grey-text">{moment(item.createdAt.toDate()).fromNow()}</div>
                </li></Link>
              })}
            </ul> : null}
        </div>
      </div>
    </div>
  )
}
}


const mapStateToProps = (state) => {
 // console.log("state in noti:" , state)
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

