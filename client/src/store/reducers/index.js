import { combineReducers } from 'redux';

import auth from './auth';
import theme from './theme';
// import signup from './signup';
// import error from './error';
// import nav from './nav';
import loader from './loader';

// import shop from './shop';
// import tab from './tab';
// import success from './successMessage';
// import interests from './interests';
import post from './post';
import user from './user';
// // eslint-disable-next-line import/no-cycle
// import orders from './orders';
// import instagram from './instagram';
// // == import admin reducer
// import usersAdmin from './admin/usersAdmin';
// import ordersAdmin from './admin/ordersAdmin';
// import alertMessage from './admin/alertMessage';
// import brandsAdmin from './admin/brandsAdmin';

export default combineReducers({
  auth,
  theme,
  // signup,
  // error,
  // nav,
  loader,
  // shop,
  // tab,
  post,
  user,
  // success,
  // interests,
  // orders,
  // instagram,
  // // admin
  // usersAdmin,
  // ordersAdmin,
  // alertMessage,
  // brandsAdmin,
});
