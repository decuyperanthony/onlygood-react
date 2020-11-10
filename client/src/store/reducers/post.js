import {
  SET_ALL_POSTS,
  SET_WHICH_TWEET,
} from '../action/post';

export const initialState = {
  posts: [],
  filteredProfilePosts: 'Tweet',
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
      console.log('SET_WHICH_TWEET');
      console.log('action.payload', action.payload);
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
