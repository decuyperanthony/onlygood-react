/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
// import React from 'react';
import axios from 'axios';
// import { useTranslation } from 'react-i18next';

import { SIGNUP } from '../action/signup';
import { errorAuth } from '../action/auth';
import { enterHomePage } from '../action/route';
// import { enterDashboardPage } from '../../actions/auth';
import { setLoaderOpen, setLoaderClose } from '../action/loader';

// import {
//   SET_ERROR_SIGNUP,
// } from '../../actions/error';

import { API_URL } from '../../utils/constante';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SIGNUP: {
    //   let errorMessage = '';
      store.dispatch(setLoaderOpen());
      //   store.dispatch({ type: SET_ERROR_SIGNUP, errorMessage });
      const {
        email, password, firstname, lastname,
      } = action.payload.data;

      console.log('email in SIGNUP', email);
      axios
        .post(`${API_URL}/signup`, {
          email: email.toLowerCase(),
          password,
          firstname,
          lastname,
        }, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('res', res);
          if (res.data.errorsList) {
            store.dispatch(setLoaderClose());
            store.dispatch(errorAuth(res.data.errorsList[0]));
          } else {
            store.dispatch(setLoaderClose());
            localStorage.user = JSON.stringify(res.data.savedUser);
            store.dispatch(enterHomePage(action.payload.history));
          }
        })
        .catch((err) => console.trace(err));
      return;
    }
    // case SET_USER_DETAILS: {
    //   const user = JSON.parse(localStorage.getItem('user'));
    //   const userId = user.id;
    //   console.log('SET_USER_DETAILS in middleware');

    //   //! mettre le set loader open
    //   // store.dispatch(setLoaderOpen());
    //   //! mettre le set loader open

    //   const {
    //     adress, birthday, city, code, country, gender, interests,
    //   } = action.payload;

    //   //! ------- requete pour ajouter les details => ok à decommenter
    //   axios.post(`${API_URL}/user/${userId}/signupdetails`, {
    //     sexe: gender,
    //     birthday,
    //     adresse1: adress,
    //     zip: code,
    //     city,
    //     country,
    //   }, {
    //     withCredentials: true,
    //   })
    //     .then((responseSignUpDetailsBackend) => {
    //       if (responseSignUpDetailsBackend.status === 200) {
    //         const MessageSuccess = () => {
    //           const { t } = useTranslation();
    //           return (
    //             <>
    //               {t('middleware-signup-setuserdetails-message-success')}
    //             </>
    //           );
    //         };
    //         // const { t } = useTranslation();
    //         // const messageSuccess = t('middleware-signup-setuserdetails-message-success');
    //         store.dispatch(setSucessMessageStep1(<MessageSuccess />));
    //         console.log('res.data', responseSignUpDetailsBackend.data);
    //         console.log('res', responseSignUpDetailsBackend);
    //       }
    //     })
    //     .catch((err) => console.trace(err));
    //   //! ------- requete pour ajouter les details => ok à decommenter

    //   //! ------- requete pour ajouter les interets
    //   const interestSelected = interests.filter((i) => i.selected === true);
    //   console.log('interestSelected', interestSelected);

    //   for (const interest of interestSelected) {
    //     //! je recupere les id des interets validés

    //     //! méthode pour requete interet vers back;
    //     axios.post(`${API_URL}/user/${userId}/interest`, {
    //       interest_id: interest.id,
    //     }, {
    //       // withCredentials: true,
    //     }).then((responseInterestBackend) => {
    //       console.log('responseInterestBackend', responseInterestBackend);
    //     }).catch((err) => console.trace(err));
    //   }

    //   return;
    // }

    // case SET_PHONE_NUMBER: {
    //   const user = JSON.parse(localStorage.getItem('user'));
    //   const userId = user.id;
    //   axios.post(`${API_URL}/user/${userId}/registerphone`, {
    //     phone: action.payload.phoneNumber,
    //   })
    //     .then((res10) => {
    //       console.log('res10', res10);
    //     })
    //     .catch((err) => console.trace(err));
    //   return;
    // }
    default: {
      next(action);
    }
  }
};
