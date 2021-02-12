import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authAction'

const Rights = (props) => {
  const url = window.location.pathname;
  
  const labor = [
    "Everyone has the right to work, to free choice of employment, to just and favorable conditions of work and to protection against unemployment.",
    "Everyone, without any discrimination, has the right to equal pay for equal work.",
    "Everyone who works has the right to just and favorable remuneration ensuring for himself and his family an existence worthy of human dignity, and supplemented, if necessary, by other means of social protection.",
    "Everyone has the right to form and to join trade unions for the protection of his/her interests."]

    const women = [
        "Placed with provisions of the Indian Penal Code, the act imposes penalty and imprisonment of up to 3 years for committing sexual harassment with women at the workplace.",
        "A female employee working in an establishment/factory under the Maternity Benefit Act, 1961  gives the benefit of paid leaves that are to be received from their employer during the maternity period. The act restricts employers to cancel the contract of employment in terms of maternity."
    ]
    const farmer = [
        "Fair and equal distribution of benefits derived from the use of plant genetic resources",
        "Protection of traditional knowledge",
        "Right to participate in decision making"]

  return (
    <div className='dashboard container'>  
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <div >
                    <span className="card-title ">Labor Rights:</span>
                    <div className="card-content">
                        { labor.map(right => {
                            return (
                                <p className="card-content pd-0 ">{right}</p>
                            )
                        })}  
                    </div>
                </div>
            </div>
        </div>
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <div >
                    <span className="card-title ">Women Specific Rights:</span>
                    <div className="card-content">
                        { women.map(right => {
                            return (
                                <p className="card-content pd-0 ">{right}</p>
                            )
                        })}  
                    </div>
                </div>
            </div>
        </div>  
        
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <div >
                    <span className="card-title ">Farmer Rights:</span>
                    <div className="card-content">
                        { farmer.map(right => {
                            return (
                                <p className="card-content pd-0 ">{right}</p>
                            )
                        })}  
                    </div>
                </div>
            </div>
        </div>        
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(Rights)