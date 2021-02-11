import { React } from "react";
import { Link, NavLink } from "react-router-dom";

const SignedOut = () => {
    return (
        <ul className="right">
            <li>
                <NavLink to='/signin'>Login</NavLink>
            </li>
            <li>
                <NavLink to='/signup'>SignUp</NavLink>
            </li>
        </ul>
    )
}

export default SignedOut;