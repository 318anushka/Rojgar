import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import moment from 'moment'

const JobDetails = (props) => {
  const { job, auth } = props;
  if(!auth.uid) return <Redirect to='/signin'></Redirect>
  if (job) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <div className='row-wrap'>
            <span className="card-title">{job.title}</span>
            <span className="card-title ">Rs. {job.salary} /day</span>
            </div>
            
            <p>{job.location}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
          <div>Description {job.description}</div>
          
          </div>
          <div className="card-action lighten-4 grey-text">
          <p className="card z-depth-0">{moment(job.createdAt.toDate()).calendar()}</p>
          <div>Contact: (+91)-{job.contact}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
   console.log(state);
  const id = ownProps.match.params.id;
  const jobs = state.firestore.data.jobs;
  const job = jobs ? jobs[id] : null
  return {
    job: job,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'jobs'
  }])
)(JobDetails)
