import { ENTER_LOGIN_PAGE, ENTER_HOME_PAGE, ENTER_ADMIN_PAGE } from '../action/route';

// eslint-disable-next-line no-unused-vars
export default (store) => (next) => (action) => {
  switch (action.type) {
    case ENTER_LOGIN_PAGE: {
      console.log('ENTER_LOGIN_PAGE');
      action.history.push('/login');
      return;
    }
    case ENTER_HOME_PAGE: {
      action.history.push('/');
      return;
    }
    case ENTER_ADMIN_PAGE: {
      action.history.push('/admin');
      return;
    }
    default: {
      // Si le middleware n'est pas intéressé par l'action reçue,
      // alors il laisse filer l'action vers la suite de son voyage.
      next(action);
    }
  }
};
