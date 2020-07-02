import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';

//importing app's components
import Header from './components/Header';
import Courses from './components/Courses';

export default () => (
  <Router>
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={Courses} />      
      </Switch>
    </div>
  </Router>
)