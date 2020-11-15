import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import store from '../store/index';

import { API_URL } from './constante';

// == actions
import { SET_ONE_USER_SELECTED_BY_ID } from '../store/action/user';
//! changer la route

const getUserSelectedById = (userId) => {
  const promise = axios.get(`${API_URL}/user/${userId}`);
  promise.then((res) => {
    const user = res.data;
    // console.log('orders', orders);
    store.dispatch({ type: SET_ONE_USER_SELECTED_BY_ID, payload: user });
  });
};

export default getUserSelectedById;
