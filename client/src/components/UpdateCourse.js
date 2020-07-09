// UpdateCourse - The component 
//     renders a form allowing a user to update one of their existing courses, 
//     an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route, 
//     and a "Cancel" button that returns the user to the "Course Detail" screen.
import React, {Component} from 'react';
import withContext from '../Context';
import axiosRequest from '../Requests';

class UpdateCourse extends Component {
    constructor() {
        super();
        this.state = {
            id: null, 
            title: null, 
            description: null, 
            estimatedTime: null, 
            materialsNeeded: null,
            postedBy: null,
            userId: null,
            errors: []
        };
    }

    //after component mounts get course details
    componentDidMount() {
        this.getCourse();
    }

    //method that sends request to add course
    submit = async () => {
        try {
            //build and send axios request through axiosRequest imported function
            const response = await axiosRequest(
                'PUT',
                `/api/courses/${this.state.id}`,
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
            if(response.status === 204) {
                this.props.history.push(`/courses/${this.state.id}`);
            }
        } catch (error) {
            if(error.response) {
                //if there are any validation errors update state with them so they can be displayed to the user
                if(error.response.status === 400) {
                    //api has two types of error reponses either a message or an error array, so both need to be handled
                    if(error.response.data.errors) {
                        this.setState({errors: error.response.data.errors});                    
                    }
                    else if(error.response.data.message) {
                        this.setState({errors: [error.response.data.message]});
                    }
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
                    estimatedTime,
                    materialsNeeded,
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

    render () {
        return (
            <>
      <hr />
      <div class="bounds course--detail">
        <h1>Update Course</h1>
        <ul>
            {this.state.errors.map( (element, index) => <li key={index}>{element}</li> )}
        </ul>
        <br />
        <div>
          <form
          onclick={this.prevent}
          onSubmit={this.prevent}
          >
            <div class="grid-66">
              <div class="course--header">
                <h4 class="course--label">Course</h4>
                <div><input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..."
                    value={this.state.title} onChange={this.handleValueChange} /></div>
                <p>{this.state.postedBy}</p>
              </div>
              <div class="course--description">
                <div><textarea id="description" name="description" class="" placeholder="Course description..." 
                value={this.state.description} onChange={this.handleValueChange}>
                </textarea></div>
              </div>
            </div>
            <div class="grid-25 grid-right">
              <div class="course--stats">
                <ul class="course--stats--list">
                  <li class="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input"
                        placeholder="Hours" value="14 hours" /></div>
                  </li>
                  <li class="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" class="" placeholder="List materials..."
                        value={this.state.materialsNeeded} onChange={this.handleValueChange}>
                    </textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="grid-100 pad-bottom"><button class="button" type="submit" onClick={this.submit}>Update Course</button>
            <button class="button button-secondary" onClick={() => this.props.history.push(`/courses/${this.state.id}`)}>Cancel</button></div>
          </form>
        </div>
      </div>
            </>
        )
    }
}

export default withContext(UpdateCourse);
