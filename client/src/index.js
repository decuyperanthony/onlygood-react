import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// == redux
import { Provider } from 'react-redux';
// eslint-disable-next-line import/extensions
import store from './store/index.js';

import App from './App/App';
import Loading from './App/Loading';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Suspense fallback={(<Loading />)}>
        <App />
      </Suspense>
    </Provider>
  </Router>, document.getElementById('root'),
);
