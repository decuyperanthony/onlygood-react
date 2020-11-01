import React from 'react';

import {
  Route,
  Switch,
  // Redirect,
  // useRouteMatch,
} from 'react-router-dom';

// == styles
// import './reset.css';
import './App.css';

// == component
import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';

const App = () => (
  <div className="App">
    <NavBar />
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </Switch>
  </div>
);

export default App;
