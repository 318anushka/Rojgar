import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const { auth, profile } = props;
  const url = window.location.pathname;
  const showHindi = url.includes("hindi")?false:true;
  const history = useHistory();
  
  const links = auth.uid ? <SignedIn profile={profile} /> : <SignedOut />;
  return (
    <nav className="nav-wrapper grey darken-3">
      
      <div className="container">
          <Link to='/' className="brand-logo">{ url.includes("hindi")       
                    ? "रोज़गार"
                    : "Rojgar"
            }</Link>
        {links}
      </div>
      {showHindi ? <button className="btn pink lighten-1 z-depth-0" onClick={() => {window.location.pathname="/hindi"}}>हिंदी </button> : 
      <button className="btn pink lighten-1 z-depth-0" onClick={() => history.goBack()}>English </button>}
      
    </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log("navbar state:", state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)