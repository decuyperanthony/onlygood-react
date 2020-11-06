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
