// ===  SET_ALL_USERS
export const SET_ALL_USERS = 'SET_ALL_USERS';

export const setAllUsers = (payload) => ({
  type: SET_ALL_USERS,
  payload,
});

// ===  SET_ONE_USER_BY_ID
export const SET_ONE_USER_BY_ID = 'SET_ONE_USER_BY_ID';

export const setOneUserById = (payload) => ({
  type: SET_ONE_USER_BY_ID,
  payload,
});
