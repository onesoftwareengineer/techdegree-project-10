// CreateCourse - The component 
//     renders a form allowing a user to create a new course, 
//     a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route, 
//     and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, {Component} from 'react';
import withContext from '../Context';
import axiosRequest from '../Requests';

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
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
    
    //method that sends request to add course
    submit = async () => {
        try {
            //build and send axios request through axiosRequest imported function
            const response = await axiosRequest(
                'POST',
                '/api/courses',
                true,
                {
                    email: this.props.context.authenticatedUserEmail,
                    password: this.props.context.authenticatedUserPassword
                },
                {
                    title: this.state.title,
                    description: this.state.description,
                    estimatedTime: this.state.estimatedTime,
                    materialsNeeded: this.state.materialsNeeded                    
                }
            );
            //if request successfull redirect user to first page
            if(response.status === 201) {
                this.props.history.push('/');
            }
        } catch (error) {
            if(error.response) {
                //if there are any validation errors update state with them so they can be displayed to the user
                if(error.response.status === 400) {
                    this.setState({errors: error.response.data.errors});                    
                }
                //else if credentials don't exist or are faulty
                else if(error.response.status === 401) {
                    this.props.history.push('/forbidden');  
                }                
            } else {
                //else if there was a server error redirect user to error page
                this.props.history.push('error');
            }
        }
    }

    render() {
        return (
            <>
            <hr />
            <div className="bounds course--detail">
              <h1>Create Course</h1>
              <div>
                <div>
                  {this.state.errors.length > 0 ? <h2 className="validation--errors--label">Validation errors</h2> : null}
                  <div className="validation-errors">
                    <ul>
                        {
                            this.state.errors.map( 
                                (element, index) => <li key={index}>{element}</li>
                            )
                        }
                    </ul>
                  </div>
                </div>
                <form 
                    onClick={this.prevent}
                    onSubmit={this.prevent}
                    >
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                          value={this.state.title} onChange={this.handleValueChange} /></div>
                      <p>By Joe Smith</p>
                    </div>
                    <div className="course--description">
                      <div><textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange={this.handleValueChange} ></textarea></div>
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                              placeholder="Hours" value={this.state.estimatedTime} onChange={this.handleValueChange} /></div>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.handleValueChange} ></textarea></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit" onClick={this.submit}>Create Course</button>
                    <button className="button button-secondary" onClick={() => this.props.history.push('/')}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>       
            </>     
        );
    }
};

export default withContext(CreateCourse);