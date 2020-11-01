export const ENTER_LOGIN_PAGE = 'actions/ENTER_LOGIN_PAGE';
export const ENTER_ADMIN_PAGE = 'actions/ENTER_ADMIN_PAGE';

// ===  ENTER_HOME_PAGE
export const ENTER_HOME_PAGE = 'actions/ENTER_HOME_PAGE';

export const enterHomePage = (history) => ({
  type: ENTER_HOME_PAGE,
  history,
});
