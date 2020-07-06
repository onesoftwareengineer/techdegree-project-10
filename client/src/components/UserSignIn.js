// UserSignIn - The component 
//     renders a form allowing the user to sign using their existing account information, 
//     a "Sign In" button that when clicked signs in the user, 
//     and a "Cancel" button that returns the user to the default route (i.e. the list of courses).

import React, {Component} from 'react';

class UserSignIn extends Component {
    constructor () {
        super();
    };

    render() {
        
        return (
            <>
            <hr />
            <div class="bounds">
                <div class="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <form>
                    <div><input id="emailAddress" name="emailAddress" type="text" class="" placeholder="Email Address" value="" /></div>
                    <div><input id="password" name="password" type="password" class="" placeholder="Password" value="" /></div>
                    <div class="grid-100 pad-bottom">
                        <button class="button" type="submit">Sign In</button>
                        <button class="button button-secondary" onclick={() => this.props.history.push('/')}>Cancel</button>
                    </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <a href="#">Click here</a> to sign up!</p>
                </div>
            </div>      
            </>    
        )
    }
}

export default UserSignIn;

  