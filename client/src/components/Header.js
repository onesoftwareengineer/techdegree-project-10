// Header- The component renders the top menu bar and buttons 
//     for signing in 
//     and signing up (if there's not an authenticated user) 

//     or the user's first and last name 
//     and a button for signing out (if there's an authenticated user).

import React from 'react';
import withContext from '../Context';

const Header = (props) => {
    const { context } = props;
    const { authenticatedUser } = context;

    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                { authenticatedUser ? 
                    <nav><span>Welcome {authenticatedUser}</span><a className="signout" href="index.html">Sign Out</a></nav> : 
                    <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
                }
            </div>
        </div>
    );
};

export default withContext(Header);