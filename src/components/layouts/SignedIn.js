import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authAction'

const SignedIn = (props) => {
  const url = window.location.pathname;
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/create'>{ url.includes("hindi")       
                    ? "नया जोब "
                    : "New Job"
            }</NavLink></li>
        <li><a onClick={props.signOut}>{ url.includes("hindi")       
                    ? "लॉग आउट "
                    : "Log Out"
            }</a></li>
        <li><NavLink to='/' className="btn btn-floating pink lighten-1">
            { props.profile.initials }</NavLink></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedIn)