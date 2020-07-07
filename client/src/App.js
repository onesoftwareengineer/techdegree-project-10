import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';

import './styles/global.css'; 

//importing app's components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

export default () => (
  <Router>
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route path="/error" component={UnhandledError} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/signout" component={UserSignOut} />
        <Route component={NotFound} />

      </Switch>
    </div>
  </Router>
)