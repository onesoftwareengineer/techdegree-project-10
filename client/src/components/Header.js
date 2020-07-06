// Header- The component renders the top menu bar and buttons 
//     for signing in 
//     and signing up (if there's not an authenticated user) 

//     or the user's first and last name 
//     and a button for signing out (if there's an authenticated user).

import React from 'react';
import withContext from '../Context';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    const { context } = props;
    const { authenticatedUser } = context;

    return (
        <div className="header">
            <div className="bounds">
                <NavLink to="/"><h1 className="header--logo">Courses</h1></NavLink>
                { authenticatedUser ? 
                    <nav><span>Welcome {authenticatedUser}</span><a className="signout" href="index.html">Sign Out</a></nav> : 
                    <nav>
                        <NavLink className="signup" to="/signin">Sign Up</NavLink>
                        <NavLink className="signin" to="/signin">Sign In</NavLink>
                    </nav>
                }
            </div>
        </div>
    );
};

export default withContext(Header);