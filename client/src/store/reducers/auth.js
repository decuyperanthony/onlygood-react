import {
  ERROR_AUTH,
} from '../action/auth';

const initialState = {
  errorAuth: '',
  // userData: {},
  // userInstagramData: {},
  // userToken: '',
  // valueSuccessMessageRegister: false,
  // valueNotifMailActive: false,
  // stepperValue: 0,
};

const authentification = (state = initialState, action = {}) => {
  switch (action.type) {
    case ERROR_AUTH: {
      return {
        ...state,
        errorAuth: action.payload,
      };
    }

    // case SET_USER_INSTAGRAM_DATA: {
    //   console.log('action ==> ', action);
    //   return {
    //     ...state,
    //     userInstagramData: action.userInstagramData,
    //   };
    // }

    // case SET_USER_TOKEN: {
    //   return {
    //     ...state,
    //     userToken: action.userToken,
    //   };
    // }

    // case RESET: {
    //   return {
    //     ...initialState,
    //   };
    // }

    // case RESET_ADMIN: {
    //   return {
    //     ...initialState,
    //   };
    // }

    // case OPEN_SUCCESS_MESSAGE_REGISTER: {
    //   return {
    //     ...state,
    //     valueSuccessMessageRegister: action.valueBool,
    //   };
    // }

    // case SHOW_NOTIF_MAIL_ACTIVED: {
    //   return {
    //     ...state,
    //     valueNotifMailActive: true,
    //   };
    // }

    // case CLOSE_NOTIF_MAIL_ACTIVED: {
    //   return {
    //     ...state,
    //     valueNotifMailActive: false,
    //   };
    // }

    // case SET_STEP: {
    //   return {
    //     ...state,
    //     stepperValue: action.step,
    //   };
    // }

    // case SET_PASSWORD: {
    //   return {
    //     ...state,
    //     userData: action.user,
    //   };
    // }

    default: {
      return state;
    }
  }
};
export default authentification;
