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

export default () => (
  <Router>
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/:id" component={CourseDetail} />
      </Switch>
    </div>
  </Router>
)