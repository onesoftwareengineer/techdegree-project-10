import React, { Component } from 'react';
import axiosRequest from './Requests';

const AppContext = React.createContext();

//export context provider to wrap App in context and provide it to the whole app
export class Provider extends Component {
    state = {
        authenticatedUser: null,
        authenticatedUserId: 1
    }

    render () {
        return (
            <AppContext.Provider value={
                {
                    authenticatedUser: this.state.authenticatedUser,
                    authenticatedUserId: this.state.authenticatedUserId,
                    axiosRequest
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

        
