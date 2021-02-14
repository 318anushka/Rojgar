import React from 'react'
import moment from 'moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';


const JobSummary = ({job}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <div className='row-wrap'>
          <span className="card-title ">{job.title}</span>
          <span className="card-title ">Rs. {job.salary} /day</span>
        </div>
        <div className="row-wrap">
            <div className='column'>
            <p className='mrglr-20'>{job.location}</p>
            <p className="grey-text">{moment(job.createdAt.toDate()).calendar()}</p></div>
        <div>     
        </div>         
        </div>

      </div>
    </div>
  )
}

export default JobSummary