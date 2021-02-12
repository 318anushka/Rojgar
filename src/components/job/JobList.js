import React, { Component } from 'react'
import JobSummary from "./JobSummary";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

// const JobList = ({jobs, searchTerm}) => {
//   state = {
//     latitude: '',
//     longitude: '',
//     address: ''
//   }
//   if(searchTerm.includes("near me")){
//     navigator.geolocation.getCurrentPosition(function(position) {  
//       console.log(position)
//     });  }
//   return (
//     <div className="project-list section">
//       { jobs && jobs.filter(val => {
//         if(searchTerm == ""){
//           return val;
//         }
//         else if(searchTerm.toLowerCase().includes(val.profile.toLowerCase())){
//           return val;
//         }
//       })
//       .map(job => {
//         return (
//           <Link to={'/job/' + job.id} key={job.id}>
//           <JobSummary job={job} searchTerm={searchTerm} />
//           </Link>
//         )
//       })}  
//     </div>
//   )
// }

// export default JobList

class JobList extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      address: ""
    }
  }

  render() {
    const { jobs, searchTerm } = this.props;
    console.log("joblist", this.props)
    return (
    <div className="project-list section">
      { jobs && jobs.filter(val => {
        if(searchTerm == ""){
          return val;
        }
        else if(searchTerm.toLowerCase().includes(val.title.toLowerCase())){
          return val;
        }
        else if(this.props.searchTerm.toLowerCase().includes("near me") && val.location.toLowerCase().includes(this.props.currentLocation.toLowerCase())){
          return val;
        }
        else if(this.state.address!="" && val.location.toLowerCase().includes(this.state.address.toLowerCase())){
          return val;
        }
      })
      .map(job => {
        return (
          <Link to={'/job/' + job.id} key={job.id}>
          <JobSummary job={job} searchTerm={searchTerm} />
          </Link>
        )
      })}  
    </div>
  )
  }
}

const mapStateToProps = (state) => {
   return {
     currentLocation: state.firebase.profile.currentLocation,
   }
 }

 export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users' }
    
  ])
)(JobList)