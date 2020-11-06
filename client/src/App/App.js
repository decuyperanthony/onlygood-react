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

import Loader from './LoaderBackDrop';

//* === === === === === === DASHBOARD === === === === === === === === === ===
// == sur la route /dashboard/quelquechose
const Dashboard = () => {
  // const { articles } = useSelector((state) => state.shop);
  // const dispatch = useDispatch();
  // const classes = useStyles();
  const { path } = useRouteMatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const userToken = JSON.parse(localStorage.getItem('userToken'));

  // == auto connect
  if (userToken) {
    const myId = user.id;
    getUserData(myId);
  }

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
            return <Home {...props} />;
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
        {/* {ArticleRouterJSX} */}

        {/* {articles.map((article) => (
          <Route
            key={article.id}
            exact
            path={`${path}/${article.id}`}
            render={(props) => {
              if (!userToken) {
                return <Redirect to="/login" />;
              }
              if (!userDetails || !userSocialNetwork || !userPhone) {
                return <Redirect to={`${path}/registerstepper/`} />;
              }
              if (article) {
                return <Article article={article} />;
              }
              return <Article {...props} />;
            }}
          />
        ))} */}
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
      <Paper style={{ height: '100vh' }}>
        <div className="App">
          <Loader />
          {/* <AppBar /> */}
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
