import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';
import withContext from './Context';
import UserSignIn from './components/UserSignIn';

// solution A - adds consumer directly 
// export default ({ component: Component, ...rest }) => {
//   return (
//     <Consumer>
//       {context => (
//         <Route
//           {...rest}
//           render={props => context.authenticatedUser ? (
//               <Component {...props} />
//             ) : (
//               <Redirect to={{
//               pathname: '/signin',
//               state: { from: props.location },
//             }} />
//             )
//           }
//         />
//     )}
//     </Consumer>
//   );
// };

// solution B - adds consumer by using withContext
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
            <Route 
                {...rest}
                render = {
                    (props) => 
                        rest.context.authenticatedUser ?
                        <Component {...props} />
                        :
                        <Redirect to={{
                            pathname: '/signin',
                            state: { from: props.location },
                        }} />
                }/>
      )
};

// // solution C - returns directly the component and also uses withContext
// const PrivateRoute = ({ component, ...options }) => {
//   const {authenticatedUser} = options.context;
//   const finalComponent = authenticatedUser ? component : UserSignIn;
//   return <Route {...options} component={finalComponent} />;
// };

export default withContext(PrivateRoute);