/* eslint-disable import/no-cycle */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import {
  SET_ALL_POSTS,
  SET_WHICH_TWEET,
  setTweet,
  SET_TWEET,
} from '../action/post';
import { API_URL } from '../../utils/constante';
import store from '../index';

export const initialState = {
  posts: [],
  filteredProfilePosts: [
    {
      id: 1,
      content: 'hello',
    },
  ],
};

const post = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        // message: action.message,
      };

    case SET_WHICH_TWEET:
      const userId = JSON.parse(localStorage.getItem('userId'));
      axios.get(`${API_URL}/${action.payload}/${userId}`)
        .then((res) => {
          store.dispatch(setTweet(res.data));
        })
        .catch((err) => console.trace(err));
      return {
        ...state,
      };

    case SET_TWEET:
      // const userId = JSON.parse(localStorage.getItem('userId'));
      return {
        ...state,
        filteredProfilePosts: action.payload,
        // posts: action.payload,
      };

    default:
      return state;
  }
};

export default post;
