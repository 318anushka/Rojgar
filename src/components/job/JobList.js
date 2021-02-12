import React, { Component } from 'react'
import JobSummary from "./JobSummary";
import { Link } from 'react-router-dom'

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
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getCoordinates(position){
    console.log(position);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      address: "Bangalore"
    })
   // console.log(this.state);
  }
  

  render() {
    const { jobs, searchTerm } = this.props;
    // if(searchTerm.includes("near me") && navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition(this.getCoordinates)
    // }
    return (
    <div className="project-list section">
      { jobs && jobs.filter(val => {
        if(searchTerm == ""){
          return val;
        }
        else if(searchTerm.toLowerCase().includes(val.title.toLowerCase())){
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

export default JobList;