// import { createStore, compose } from 'redux';
// import reducer from './reducer';

// import middlewares from './middlewares';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // On utilise une fonction utilitaire fournie par l'extension
// // Redux DevTools pour venir « pimper » notre store.
// const enhancers = composeEnhancers(middlewares);

// const store = createStore(reducer, enhancers);

// export default store;

// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';
// import signupMiddleware from '../middlewares/user/signup';
import authMiddleware from './middlewares/auth';
import signUpMiddleware from './middlewares/signup';
import routesMiddleware from './middlewares/routes';
// import authAdminMiddleware from '../middlewares/admin/auth';

// == Import : local
// eslint-disable-next-line import/no-cycle
import rootReducer from './reducers';
// import logMiddleware from "../middleware/logMiddleware";

// == Enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// == Enhancers disable redux devtools
// const composeEnhancers =  (nodeEnv !== 'production' &&
//     typeof window !== 'undefined' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    // logMiddleware,
    // signupMiddleware,
    authMiddleware,
    routesMiddleware,
    signUpMiddleware,
    // routesMiddleware,
    // authAdminMiddleware,
  ),
);

// == Store
const store = createStore(
  rootReducer,
  // preloadedState,
  enhancers,
);

// == Export
export default store;
