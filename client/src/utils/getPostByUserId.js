import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import store from '../store/index';

import { API_URL } from './constante';

// == actions
import { SET_TWEET } from '../store/action/post';
//! changer la route

const getPostByUserId = (userId) => {
  const promise = axios.get(`${API_URL}/userpost/${userId}`);
  promise.then((res) => {
    // const user = res.data;
    console.log('res', res);
    store.dispatch({ type: SET_TWEET, payload: res.data });
  });
};

export default getPostByUserId;
