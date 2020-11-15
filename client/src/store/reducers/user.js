import {
  SET_ALL_USERS,
  SET_ONE_USER_BY_ID,
  SET_ONE_USER_SELECTED_BY_ID,
} from '../action/user';

export const initialState = {
  users: [],
  user: [],
  userSelected: [],
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        // message: action.message,
      };
    case SET_ONE_USER_BY_ID:
      return {
        ...state,
        user: action.payload,
        // message: action.message,
      };
    case SET_ONE_USER_SELECTED_BY_ID:
      return {
        ...state,
        userSelected: action.payload,
        // message: action.message,
      };

    default:
      return state;
  }
};

export default user;
