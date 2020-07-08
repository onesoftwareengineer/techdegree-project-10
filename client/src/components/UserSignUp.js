// UserSignUp - The component 
//     renders a form allowing a user to sign up by creating a new account, 
//     a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user, 
//     and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import withContext from '../Context';
import axiosRequest from '../Requests';

class UserSignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
            errors: []
        }
    }

    //prevents form default for form submit and onclick
    prevent = (e) => {
        e.preventDefault();
    }

    //updates state for field input, to do this state properties are the same with the field id's
    handleValueChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    }    

    //submits new user request
    submit = async () => {
        //validate if password and confirm password are the same
        if(this.state.password !== this.state.confirmPassword) {
            this.setState({errors: ["Password and Confirm Password fields should match."]});
        } else {
            //prepare user details sent to server to create new user
            const body = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                password: this.state.password
            };

            try {
                const response = await axiosRequest('POST','/api/users', null, null, body);
                //if request successfull then log-in user and redirect to homepage 
                if(response.status === 201) {
                    //calls login method from Context by passing username and password
                    //it only handles server error and positive response since credentials have been validated during account creation
                    const response = await this.props.context.login(this.state.emailAddress, this.state.password);    
                    //if there were any server errors send user to error page
                    if(response === 'error') {
                        this.props.history.push('/error');
                    } 
                    //else if response is true, then request is succesffull and user needs to be send to first page
                    else if(response) {
                        this.props.history.push('/');
                    }
                }
            } catch(error) {
                console.log(error.response);
                if(error.response) {
                    //handle bad request to display validation errors
                    if(error.response.status === 400) {
                        this.setState({errors: error.response.data.errors});
                    }
                }
            }
        }
    }

    render() {
        return (
            <>
            <hr />
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <ul>
                    {
                        this.state.errors.map( (element, index) => <li key={index}>{element}</li> )
                    }
                    </ul>
                    <br />
                    <div>
                    <form onClick={this.prevent} onSubmit={this.prevent}>
                        <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={this.handleValueChange} /></div>
                        <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={this.handleValueChange} /></div>
                        <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleValueChange} /></div>
                        <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.handleValueChange} /></div>
                        <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleValueChange} /></div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit" onClick={this.submit}>Sign Up</button>
                            <button className="button button-secondary" onClick={() => this.props.history.push('/')}>Cancel</button>
                        </div>
                    </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
            </>
        )
    }
}

export default withContext(UserSignUp);