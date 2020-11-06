import React from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
import AppBar from './NavBar/AppBar';
// import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';

const App = () => {
  // const [darkmode, setDarkmode] = useState(false);
  const { darkmodeBoolean } = useSelector((state) => state.theme);

  const theme = createMuiTheme({
    palette: {
      primary: {
        // main: '#D9B08C',
        main: '#116466',
      },
      type: darkmodeBoolean ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: '100vh' }}>
        <div className="App">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <AppBar />
          </Switch>
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
