import React from 'react';
import 'semantic-ui-css/semantic.min.css';

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
import AppBar from './NavBar1/AppBar';
// import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';

const App = () => (
  <div className="App">
    <AppBar />
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
