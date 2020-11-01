// import {
//   SET_USER,
//   SET_USER_INSTAGRAM_DATA,
//   SET_USER_TOKEN,
//   RESET,
//   OPEN_SUCCESS_MESSAGE_REGISTER,
//   SHOW_NOTIF_MAIL_ACTIVED,
//   CLOSE_NOTIF_MAIL_ACTIVED,
//   SET_STEP,
//   // SET_PASSWORD,
// } from '../actions/auth';

const initialState = {
  // userData: {},
  // userInstagramData: {},
  // userToken: '',
  // valueSuccessMessageRegister: false,
  // valueNotifMailActive: false,
  // stepperValue: 0,
};

const authentification = (state = initialState, action = {}) => {
  switch (action.type) {
    // case SET_USER: {
    //   return {
    //     ...state,
    //     userData: action.user,
    //   };
    // }

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
