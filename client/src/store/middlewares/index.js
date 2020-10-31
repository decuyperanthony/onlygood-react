import { applyMiddleware } from 'redux';

import routesMW from './routes';

export default applyMiddleware(
  routesMW,
);
