/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
// import { useTranslation } from 'react-i18next';

import { LOGIN } from '../action/auth';

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
            console.log('res', res);
            // console.log('fneled');
            // console.log('res', res.data.user.mail_actived);
            // if (res.data.user.mail_actived) {
            //   store.dispatch(setStep(1));
            // }
            // requete pour savoir si le user a rempli ses détails
            // console.log('res.data.userDetails', res.data.userDetails);
            // console.log('res.data.userList', res.data.userList);
            // localStorage.valueSocialNewtorkTab = JSON.stringify(1);
            // localStorage.user = JSON.stringify(res.data.user);
            // localStorage.userToken = JSON.stringify(res.data.userToken);
            // localStorage.userDetails = JSON.stringify(res.data.userList.userDetails);
            // localStorage.userSocialNetwork = JSON.stringify(res.data.userList.userSocialNetwork);
            // localStorage.userPhone = JSON.stringify(res.data.userList.userPhone);

            // if (res.data.userList.userDetails) {
            //   // setStep(1)
            //   store.dispatch(setStep(2));
            // }

            // if (res.data.userList.userSocialNetwork) {
            //   store.dispatch(setStep(3));
            // }

            // localStorage.userDetails = JSON.stringify(res.data.userDetails);
            // const user = JSON.parse(localStorage.getItem('user'));
            // if (res.data.userList.userSocialNetwork) {
            //   axios.get(`${API_URL}/getuseryoutubedata/user/${res.data.user.id}`)
            //     .then((response) => {
            //       localStorage.youtubeData = JSON.stringify(response.data);
            //     });
            //   //* == requete pour avoir les derniers posts du user
            //   axios
            //     .get(`${API_URL}/getlasttenpostsinfo/${res.data.user.id}`)
            //     .then(async (resApi) => {
            //       await console.log('resApi ==> ', resApi.data.listPosts);
            //       localStorage.instagramPosts = JSON.stringify(resApi.data.listPosts);
            //       await store.dispatch(setUserPostsInstagram(resApi.data.listPosts));
            //       // if (resApi.data)
            //       // resApi.data.listPosts.map((post) => {
            //       //   console.log('post', post);
            //       // });
            //     })
            //     .catch((err) => console.trace(err));
            //   //* == requete pour avoir les infos insta du user
            //   axios.get(`${API_URL}/getuserinfo/${res.data.user.id}`)
            //     .then(async (resBackend) => {
            //       // console.log('resBackend', resBackend);
            //       // ? voir INSOMNIA DERNIERE REQUETE ET METTRE LE CODE ICI
            //       // ? if (res.XXX.user_fb_access_token) blabla else ce qui suit
            // eslint-disable-next-line max-len
            //       // ? blabla = stocker dans le local storage le fait qu il n ait pas donné de token
            //       //
            //       localStorage.fbData = JSON.stringify(resBackend.data);
            //       await store.dispatch(enterDashboardPage(action.payload.history));
            //       store.dispatch(setLoaderClose());
            //     })
            //     .catch((err) => {
            //       store.dispatch(setLoaderClose());
            //       console.log('on est dans le catch');
            //       console.trace(err);
            //     });
            // }
            // store.dispatch(setUser(user));
            // store.dispatch(setLoaderClose());
            //! store.dispatch(enterDashboardPage(action.payload.history));
          }
        })
        .catch((error) => {
          // store.dispatch(setLoaderClose());
          console.trace(error);
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
