import {
  SET_ALL_POSTS,
} from '../action/post';

export const initialState = {
  posts: [],
};

const post = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        // message: action.message,
      };

    default:
      return state;
  }
};

export default post;
