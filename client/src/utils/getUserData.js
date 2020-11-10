import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import store from '../store/index';
import { API_URL } from './constante';

import { setUser } from '../store/action/auth';

const getUserData = (userId) => {
  // console.log('on set le user data');
  axios
    .get(`${API_URL}/user/${userId}`)
    .then((res) => {
      store.dispatch(setUser(res.data));
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.trace(err));
};

export default getUserData;
