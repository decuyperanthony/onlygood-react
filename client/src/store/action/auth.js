// ===  LOGIN
export const LOGIN = 'LOGIN';

export const login = (payload, history) => ({
  type: LOGIN,
  payload,
  history,
});

// === error AUTH
export const ERROR_AUTH = 'ERROR_AUTH';

export const errorAuth = (payload) => ({
  type: ERROR_AUTH,
  payload,
});

// === SET_USER after login
export const SET_USER = 'actions/SET_USER';

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

// === DISCONNECT
export const DISCONNECT = 'actions/DISCONNECT';

export const disconnect = () => ({
  type: DISCONNECT,
});
