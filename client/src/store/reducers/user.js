import {
  SET_ALL_USERS,
} from '../action/user';

export const initialState = {
  users: [],
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        // message: action.message,
      };

    default:
      return state;
  }
};

export default user;
