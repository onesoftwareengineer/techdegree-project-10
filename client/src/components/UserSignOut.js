// UserSignOut - The component 
//     signs out the authenticated user 
//     and redirects the user to the default route (i.e. the list of courses).
import React from 'react';
import withContext from '../Context';
import { Redirect } from 'react-router-dom';

// class UserSignOut extends Component {
//     constructor() {
//         super();
//     }

//     render() {
//         this.props.context.signout();

//         return(
//             <Redirect to="/" />
//         )
//     }
// };
// export default withContext(UserSignOut);

//below is the short version of the above
export default withContext(
    ({context}) => {
            context.signout();

            return(
                <Redirect to="/" />
            )    
    }
);