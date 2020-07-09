import React, { Component } from 'react';
import axiosRequest from './Requests';
import Cookies from 'js-cookie';

const AppContext = React.createContext();

export const Consumer = AppContext.Consumer;

//export context provider to wrap App in context and provide it to the whole app
export class Provider extends Component {
    //get user credentials by destructuring authenticatedUser cookie if found, else null
    state = {...Cookies.getJSON('authenticatedUser')} || null;

    //method that logs-in the user by username and password
    login = async (email, password) => { 
        try {
            //make axios request 
            const user = await axiosRequest(
                'GET',
                '/api/users', 
                true, 
                {email, password}
            );
            
            //if everything is ok
            if(user.status === 200) {

                //preparing user credentials to update state and add cookie
                const userCredentials = {
                    authenticatedUser: user.data.firstName,
                    authenticatedUserId: user.data.id,
                    authenticatedUserEmail: email,
                    authenticatedUserPassword: password                    
                };

                //update state with authenticated user credentials
                this.setState(userCredentials);

                //write cookies on users browser so that future requests will pe possible after browser closure
                Cookies.set('authenticatedUser', JSON.stringify(userCredentials), {expires: 3});

                //returns true to indicate authentication was successfull
                return true;
            }
        } catch (error) {
            if(error.response) {
                //if credentials are invalid return false to the component
                if(error.response.status === 401) {
                    return false;
                } 
            } else {
                //else return error to the component to indicate it's a server error
                return 'error';
            }
        }  
    }

    //signout method used to clear state and cookie stored credentials
    signout = () => {
        //clear all stored credentials
        this.setState({
            authenticatedUser: null,
            authenticatedUserId: null,
            authenticatedUserEmail: null,
            authenticatedUserPassword: null                 
        });
        Cookies.remove('authenticatedUser');
    }

    render () {
        return (
            <AppContext.Provider value={
                {
                    authenticatedUser: this.state.authenticatedUser,
                    authenticatedUserId: this.state.authenticatedUserId,
                    authenticatedUserEmail: this.state.authenticatedUserEmail,
                    authenticatedUserPassword: this.state.authenticatedUserPassword,
                    axiosRequest,
                    login: this.login,
                    signout: this.signout
                }
            }>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

//export function to provide context to component
export default function withContext(Component) {
    return function contextComponent (props) {
        return (
            <AppContext.Consumer>
                {context => <Component {...props} context={context}/>}
            </AppContext.Consumer>
        )
    }
}