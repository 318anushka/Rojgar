import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { createJob } from "../../store/actions/jobAction";

class CreateListing extends Component {
  state = {
    title: '',
    salary: '',
    location: '',
    description: '',
    contact: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createJob(this.state);
    this.props.history.push('/');
  }
  render() {
      const { auth } = this.props;
      if(!auth.uid) return <Redirect to='/signin'></Redirect>
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Add a New Job</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Title</label>
          </div>
          <div className="input-field">
            <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Description</label>
          </div>
          <div className="input-field">
            <input type="text" id='location' onChange={this.handleChange} />
            <label htmlFor="title">Location</label>
          </div>
          <div className="input-field">
            <input type="text" id='salary' onChange={this.handleChange} />
            <label htmlFor="salary">Salary</label>
          </div>
          <div className="input-field">
            <input type="text" id='contact' onChange={this.handleChange} />
            <label htmlFor="contact">Contact</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Post Job</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
      createJob: (job) => dispatch(createJob(job))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateListing)
