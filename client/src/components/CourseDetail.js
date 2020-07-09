// CourseDetail - The component 
//     retrieves the detail for a course from the REST API, 
//     renders the course details, 
//     an "Update Course" button for navigating to the "Update Course" screen, 
//     and a "Delete Course" button that when clicked sends a DELETE request to the REST API to delete a course. 

import React, {Component} from 'react';
import withContext from '../Context';
import { Link } from 'react-router-dom';
import axiosRequest from '../Requests';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
            id: null, 
            title: null, 
            estimatedTime: null, 
            materialsNeeded: null,
            description: null,
            postedBy: null,
            userId: null
        };
    }

    componentDidMount() {
        this.getCourse();
    }

    //function to update state / course with the course details, course id taken from url
    getCourse = async () => {
        try {
            const course = await this.props.context.axiosRequest('GET',`/api/courses/${this.props.match.params.id}`);
            if(course.status === 200) {

                //destructure course data to get variables that will be added to state
                const { 
                    id, 
                    title, 
                    description, 
                    estimatedTime, 
                    materialsNeeded,
                    User
                } = course.data;

                //preparing posted by variable to be added to state
                const postedBy = User.firstName + ' ' + User.lastName;

                //updating state
                this.setState({
                    id,
                    title,
                    description,
                    materialsNeeded,
                    estimatedTime,
                    postedBy,
                    userId: User.id
                });
            }
        } catch(error) {
            if(error.response)  {
                if(error.response.status === 404) {
                    //if course not found, api will return a 404 and user will be forwarded to notfound page
                    this.props.history.push('/notfound');            
                }
            }
            else {
                this.props.history.push('/error');
            }
        }
    }

    //method that sends a DELETE request through axios to delete a course
    deleteCourse = async () => {
        try {
            //prepare credentials for sending delete request
            const credentials = {
                email: this.props.context.authenticatedUserEmail,
                password: this.props.context.authenticatedUserPassword
            };

            const response = await axiosRequest(
                'DELETE', 
                `/api/courses/${this.state.id}`, 
                true, 
                credentials
            );

            //if course deleted successfully API should have returned a 204 response
            if(response.status === 204) {
                this.props.history.push('/');
            }
        } catch (error) {
            if(error.response) {
                //if course not found, redirect to not found page
                if(error.response.status === 404) {
                    this.props.history.push('/notfound');
                }
                //else if user tried to delete some elses course
                else if(error.response.status === 403 || error.response.status === 401) {
                    this.props.history.push('/forbidden');  
                }
            } else {
                //else redirect to server error page
                this.props.history.push('/error');
            }
        }
    }

    render () {
        return (
            <>
            <hr />
            <div>
            
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        {
                            this.state.userId === this.props.context.authenticatedUserId ?

                                    <span>
                                    <Link className="button" to={`/courses/${this.state.id}/update`}>Update Course</Link>
                                    <button className="button" onClick={this.deleteCourse}>Delete Course</button></span> 
                                : null
                        }
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
            </div>

            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{this.state.title}</h3>
                    <p>By {this.state.postedBy}</p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown source={this.state.description} />
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        {   this.state.estimatedTime ? 
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{this.state.estimatedTime}</h3>
                            </li> : null
                        }
                        {   this.state.materialsNeeded ?                    
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ul>
                                    <ReactMarkdown source={this.state.materialsNeeded} />                                    
                                </ul>
                            </li> : null
                        }
                    </ul>
                    </div>
                </div>
            </div>

            </div>
            </>
        );
        }
}

export default withContext(CourseDetail);