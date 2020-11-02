import {
  TOGGLE_DARKMODE,
} from '../action/theme';

// const initialState = {
//   counter: 0,
// };

// export default (state = initialState, action = {}) => {
//   switch (action.type) {
//     // case INCREMENT: {
//     //   return {
//     //     ...state,
//     //     counter: state.counter + 1,
//     //   };
//     // }
//     default: {
//       return state;
//     }
//   }
// };

// import { SET_LOADER_OPEN, SET_LOADER_CLOSE } from '../actions/loader';

export const initialState = {
  darkmodeBoolean: false,
//   message: '',
};

const theme = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      console.log(('dk mode'));
      console.log('action', action);
      return {
        ...state,
        darkmodeBoolean: action.payload,
        // message: action.message,
      };
      // case SET_LOADER_CLOSE:
      //   return {
      //     ...state,
      //     loaderOpen: false,
      //     message: '',
      //   };
      // case SET_MOBILE_TOGGLE:
      //   // eslint-disable-next-line no-case-declarations
      //   const { setMenuOpen } = state;
      //   return {
      //     ...state,
      //     setMenuOpen: !setMenuOpen,
      //   };

    default:
      return state;
  }
};

export default theme;
