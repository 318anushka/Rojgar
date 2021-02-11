import { React } from "react";
import { Link, NavLink } from "react-router-dom";

const SignedOut = () => {
    const url = window.location.pathname
    return (
        <ul className="right">
            <li>
                <NavLink to='/signin'>{ url.includes("hindi")       
                    ? "लॉग इन "
                    : "Log In"
            }</NavLink>
            </li>
            <li>
                <NavLink to='/signup'>{ url.includes("hindi")       
                    ? "साइन उप "
                    : "Sign Up"
            }</NavLink>
            </li>
        </ul>
    )
}

export default SignedOut;