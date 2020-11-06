import { SET_LOADER_OPEN, SET_LOADER_CLOSE } from '../action/loader';

export const initialState = {
  loaderOpen: false,
  message: '',
};

const loader = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LOADER_OPEN:
      return {
        ...state,
        loaderOpen: true,
        message: action.message,
      };
    case SET_LOADER_CLOSE:
      return {
        ...state,
        loaderOpen: false,
        message: '',
      };
    default:
      return state;
  }
};

export default loader;
