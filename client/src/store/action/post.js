// ===  SET_ALL_POSTS
export const SET_ALL_POSTS = 'SET_ALL_POSTS';

export const setAllPosts = (payload) => ({
  type: SET_ALL_POSTS,
  payload,
});

// ===  ADD_POST
export const ADD_POST = 'ADD_POST';

export const addPost = (payload) => ({
  type: ADD_POST,
  payload,
});

// ===  ADD_POST
export const SET_WHICH_TWEET = 'SET_WHICH_TWEET';

export const setWhichTweet = (payload, userId) => ({
  type: SET_WHICH_TWEET,
  payload,
  userId,
});

export const SET_TWEET = 'SET_TWEET';

export const setTweet = (payload) => ({
  type: SET_TWEET,
  payload,
});
