import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import store from '../store/index';

import { API_URL } from './constante';

// == actions
import { SET_ALL_POSTS } from '../store/action/post';

const getAllPosts = (url = `${API_URL}/posts`) => {
  const promise = axios.get(
    url,
  );
  promise.then((res) => {
    console.log('res.data', res.data);
    const posts = res.data;
    store.dispatch({ type: SET_ALL_POSTS, payload: posts });
  });
};

export default getAllPosts;
