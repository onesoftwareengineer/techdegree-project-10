// UserSignIn - The component 
//     renders a form allowing the user to sign using their existing account information, 
//     a "Sign In" button that when clicked signs in the user, 
//     and a "Cancel" button that returns the user to the default route (i.e. the list of courses).

import React, {Component} from 'react';
import withContext from '../Context';

class UserSignIn extends Component {
    constructor () {
        super();
        this.state = {
            emailAddress: '',
            password: ''
        };
    };

    //updates state for emailAddress or password depending on users input
    handleValueChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    //prevents form default for submit and onclick
    prevent = (e) => {
        e.preventDefault();
    }

    //user submits login form
    submit = () => {
        //calls login method from Context by passing username and password
        const validUser = this.props.context.login(this.state.emailAddress, this.state.password);
        //if successfull navigate to / (so that it will display on the upper right the authenticated user)
        if(validUser) {
            this.props.history.push('/');
        } else {
        //if failed, display error message (enter valid credentials)
            
        }
    }

    render() {
        return (
            <>
            <hr />
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <form onClick={this.prevent} onSubmit={this.prevent}>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.email} onChange={this.handleValueChange}/></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.handleValueChange} /></div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit" onClick={this.submit}>Sign In</button>
                        <button className="button button-secondary" onClick={() => this.props.history.push('/')}>Cancel</button>
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

export default withContext(UserSignIn);

  