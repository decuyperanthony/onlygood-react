/* eslint-disable no-console */
// import React from 'react';
import axios from 'axios';
// import { useTranslation } from 'react-i18next';

import { LOGIN, errorAuth } from '../action/auth';
import { enterHomePage } from '../action/route';

// import { setLoaderOpen, setLoaderClose } from '../../actions/loader';

// import {
//   SET_ERROR_AUTH,
// } from '../../actions/error';

import { API_URL } from '../../utils/constante';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      console.log('login');
      // // console.log('login');
      // store.dispatch(setLoaderOpen());
      // let errorMessage = '';
      // store.dispatch({ type: SET_ERROR_AUTH, errorMessage });
      axios
        .post(`${API_URL}/login`, {
          email: action.payload.data.email.toLowerCase(),
          password: action.payload.data.password,
        }, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('>>>>>>> >>>>>> res.data', res.data);
          if (res.status === 200) {
            console.log('res', res.data);
            // console.log('fneled');
            // console.log('res', res.data.user.mail_actived);
            // if (res.data.user.mail_actived) {
            //   store.dispatch(setStep(1));
            // }
            localStorage.user = JSON.stringify(res.data.user);
            // localStorage.userToken = JSON.stringify(res.data.userToken);

            // localStorage.userDetails = JSON.stringify(res.data.userDetails);
            // const user = JSON.parse(localStorage.getItem('user'));
            // store.dispatch(setUser(user));
            // store.dispatch(setLoaderClose());
            store.dispatch(enterHomePage(action.payload.history));
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          console.log('mauvais mail ou mot de passe');
          // store.dispatch(setLoaderClose());
          // console.trace(error);
          store.dispatch(errorAuth('Wrong email or password'));
          console.log(`Can’t access ${API_URL} response. Blocked by browser?`);
          // const MessageError = () => {
          //   const { t } = useTranslation();
          //   return (
          //     <>
          //       {t('middleware-signin-signin-message-error')}
          //     </>
          //   );
          // };
          // errorMessage = <MessageError />;
          // store.dispatch({ type: SET_ERROR_AUTH, errorMessage });
        });
      break;
    }

    // case DISCONNECT: {
    //   localStorage.clear();
    //   break;
    // }

    // case UPDATE_PASSWORD: {
    //   const state = store.getState();
    //   const errorMessage = '';
    //   store.dispatch({ type: SET_ERROR_AUTH, errorMessage });
    //   const {
    //     id,
    //   } = state.auth.userData;
    //   const {
    //     password, newPassword, newPasswordConfirm,
    //   } = action.payload.data;
    //   axios
    //     .patch(`${API_URL}/user/${id}/updatepassword`, {
    //       password,
    //       newPassword,
    //       newPasswordConfirm,
    //     }, {
    //       withCredentials: true,
    //     })
    //     .then((res) => {
    //       console.log('on est dans le then');
    //       console.log('middleware updatePassword :', res.data);
    //       console.log('res :', res);
    //       // le back repond que le mot de passe n'est pas le bon pour pouvoir update
    //       if (res.data.error) {
    //         console.log('reponse back mauvais pasword : ', res.data.error);
    //         store.dispatch({ type: SET_ERROR_AUTH, errorMessage: res.data.error });
    //       } else {
    //         store.dispatch(openSuccessMessage(true));
    //       }
    //     })
    //     .catch((error) => {
    //       console.log('on est dans le catch');
    //       console.trace(error);
    //       console.log('error : ', error);
    //     });
    //   break;
    // }

    // case DELETE_PROFILE: {
    //   const userToken = JSON.parse(localStorage.getItem('userToken'));
    //   axios
    //     .delete(`${API_URL}/user/deleteaccount/${userToken}`, {
    //       withCredentials: true,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    //   localStorage.clear();
    //   break;
    // }

    default: {
      next(action);
    }
  }
};
