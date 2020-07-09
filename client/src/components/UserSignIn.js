// UserSignIn - The component 
//     renders a form allowing the user to sign using their existing account information, 
//     a "Sign In" button that when clicked signs in the user, 
//     and a "Cancel" button that returns the user to the default route (i.e. the list of courses).

import React, {Component} from 'react';
import withContext from '../Context';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {
    constructor () {
        super();
        this.state = {
            emailAddress: '',
            password: '',
            errors: ''
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
    submit = async () => {
        //calls login method from Context by passing username and password
        const response = await this.props.context.login(this.state.emailAddress, this.state.password);
        
        //if there were any server errors send user to error page
        if(response === 'error') {
            this.props.history.push('/error');
        } 
        //else if response is true, then request is succesffull and user needs to be send to first page or protected page he tried to access
        else if(response) {
            // const redirectTo = this.props.location.pathname !== '/signin' ? this.props.location.pathname : '/';
            // user will be redirected to the url he came from if such a value is stored, otherwise he will be directed to /
            const redirectTo = this.props.location.state ? this.props.location.state.from.pathname : '/';
            this.props.history.push(redirectTo);
        }
        //else it means reponse is false, so credentials were invalid, enter valid credentials error needs to be displayed
        else {
            this.setState({errors: "Enter valid credentials."});
        }
    }

    render() {
        return (
            <>
            <hr />
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <p>{this.state.errors}</p>
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
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>      
            </>    
        )
    }
}

export default withContext(UserSignIn);