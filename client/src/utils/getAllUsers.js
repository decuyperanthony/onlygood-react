import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import store from '../store/index';

import { API_URL } from './constante';

// == actions
import { SET_ALL_USERS } from '../store/action/user';

const getAllUsers = (url = `${API_URL}/users`) => {
  const promise = axios.get(
    url,
  );
  promise.then((res) => {
    // console.log('res.data', res.data);
    const users = res.data;
    store.dispatch({ type: SET_ALL_USERS, payload: users });
  });
};

export default getAllUsers;
