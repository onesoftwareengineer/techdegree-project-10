// Courses - The component 
//     retrieves the list of courses from the REST API, 
//     renders a list of courses, 
//     links each course to its respective "Course Detail" screen, 
//     and renders a link to the "Create Course" screen.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withContext from '../Context';

class Courses extends Component {
    constructor() {
        super();
        this.state = {
            courses: null
        };
    }

    componentDidMount() {
        this.getCourses();        
    }

    //method used to update state with courses
    getCourses = async () => {
        try {
            const courses = await this.props.context.axiosRequest('GET','/api/courses');
            if(courses.status === 200) {
                this.setState({courses: courses.data});
            }
        } catch {
            this.props.history.push('/error');
        }   
    }

    render() {
        //building the courses JSX
        const coursesJSX = this.state.courses ? 
            this.state.courses.map( (element,index) => 
                (
                    <div className="grid-33" key={element.id}>
                        <Link className="course--module course--link" to={`/courses/${element.id}`}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{element.title}</h3>
                        </Link>
                    </div>
                )
            ) :
            null;

        return (
            <div className="bounds">
            {coursesJSX}
            <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                  </svg>New Course</h3>
              </Link></div>
          </div>
        );
    }
}

export default withContext(Courses);