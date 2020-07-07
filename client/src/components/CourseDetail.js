// CourseDetail - The component 
//     retrieves the detail for a course from the REST API, 
//     renders the course details, 
//     an "Update Course" button for navigating to the "Update Course" screen, 
//     and a "Delete Course" button that when clicked sends a DELETE request to the REST API to delete a course. 

import React, {Component} from 'react';
import withContext from '../Context';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
            id: null, 
            title: null, 
            descriptionParagraphs: null, 
            estimatedTime: null, 
            materialsArray: null,
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
                
                //split different materials by \n sign as they added to the database from string to array
                //the below code also removes * from the beginning of each material
                const materialsArray = materialsNeeded ? materialsNeeded.split("*").join("").split('\n') : null;
                //the below code removes the last array position due to the fact that the /n separator is present at the end of each entry
                if(materialsNeeded) {
                    materialsArray.pop();
                }

                //prepare description paragraphs by splitting string into array parts
                const descriptionParagraphs = description.split('\n\n');

                //updating state
                this.setState({
                    id,
                    title,
                    descriptionParagraphs,
                    estimatedTime,
                    materialsArray,
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

    render () {
        //building the material list by mapping through the materials array
        const materialsJSX = this.state.materialsArray ?                            
            this.state.materialsArray.map( (element, index) => 
                (
                    <li key={index}>{element}</li>
                )
            ) : null;

        //building the description paragraphs by mapping through the description paragraphs array
        const descriptionJSX = this.state.descriptionParagraphs ?                            
            this.state.descriptionParagraphs.map( (element, index) => 
                (
                    <p key={index}>{element}</p>
                )
            ) : null;

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
                                    <a className="button" href="#">Delete Course</a></span> 
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
                        {descriptionJSX}
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
                        {   this.state.materialsArray ?                    
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ul>
                                    {materialsJSX}
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