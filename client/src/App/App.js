/* eslint-disable no-unused-vars */
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
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

// === method
import getUserData from '../utils/getUserData';
import getAllPosts from '../utils/getAllPosts';
import getAllUsers from '../utils/getAllUsers';

// == styles
// import './reset.css';
import './App.css';

// == component
import AppBar from './NavBar/AppBar';
// import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';
// == component
import Home from './Home';
import Explore from './Explore';
import Bookmarks from './Bookmarks';
import Profile from './Profile';
import ProfileOthers from './ProfileOthers';

import Loader from './LoaderBackDrop';

//* === === === === === === DASHBOARD === === === === === === === === === ===
// == sur la route /dashboard/quelquechose
const Dashboard = () => {
  // const { articles } = useSelector((state) => state.shop);
  // const dispatch = useDispatch();
  // const classes = useStyles();
  const { path } = useRouteMatch();
  console.log('path', path);
  const { users } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem('user'));
  const userToken = JSON.parse(localStorage.getItem('userToken'));
  console.log('users in dashboard', users);
  //  // == auto connect
  //  if (userToken) {
  //   const myId = user.id;
  //   getUserData(myId);

  // }

  // == stepper

  return (
    <>
      <Loader />
      <AppBar />
      <Switch>
        <Route
          exact
          path={`${path}/`}
          render={(props) => {
            if (!userToken) {
              return <Redirect to="/login" />;
            }
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <Profile data={user} />;
          }}
        />
        <Route
          exact
          path={`${path}/explore`}
          render={(props) => {
            if (!userToken) {
              return <Redirect to="/login" />;
            }
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <Explore {...props} />;
          }}
        />
        <Route
          exact
          path={`${path}/bookmarks`}
          render={(props) => {
            if (!userToken) {
              return <Redirect to="/login" />;
            }
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <Bookmarks {...props} />;
          }}
        />
        <Route
          exact
          path={`${path}/profile`}
          render={(props) => {
            if (!userToken) {
              return <Redirect to="/login" />;
            }
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <Profile data={user} />;
          }}
        />
        {/* {ArticleRouterJSX} */}

        {users.map((user) => (
          <Route
            key={user.id + 12323}
            exact
            path={`${path}/${user.id}`}
            render={(props) => {
              if (!userToken) {
                return <Redirect to="/login" />;
              }
              // if (!userDetails || !userSocialNetwork || !userPhone) {
              //   return <Redirect to={`${path}/registerstepper/`} />;
              // }
              if (user) {
                return <ProfileOthers data={user} />;
              }
              return <ProfileOthers data={user} />;
            }}
          />
        ))}
        {/* <Route><QuatreDashboard /></Route> */}
      </Switch>
    </>
  );
};

const App = () => {
  // const [darkmode, setDarkmode] = useState(false);
  const { darkmodeBoolean } = useSelector((state) => state.theme);
  const user = JSON.parse(localStorage.getItem('user'));
  const userToken = JSON.parse(localStorage.getItem('userToken'));
  // == auto connect
  if (userToken) {
    const myId = user.id;
    getUserData(myId);
    getAllPosts();
    getAllUsers();
    // getUserDataDetailsInterests(myId);
    // getOrdersByUserId(myId);
    // getUserInstagramData(myId);
  }

  //! manque la redirection apres le logout
  //! vers la page login

  // === theme
  const theme = createMuiTheme({
    palette: {
      primary: {
        // main: '#D9B08C',
        main: '#FFFFFF',
        // main: '#116466',
      },
      type: darkmodeBoolean ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ minHeight: '100vh' }}>
        <div className="App">
          <Loader />
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
