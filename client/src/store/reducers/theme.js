import {
  TOGGLE_DARKMODE,
} from '../action/theme';

export const initialState = {
  darkmodeBoolean: false,
//   message: '',
};

const theme = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return {
        ...state,
        darkmodeBoolean: action.payload,
        // message: action.message,
      };

    default:
      return state;
  }
};

export default theme;
