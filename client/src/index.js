import React, { Suspense, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

// == redux
import { Provider } from 'react-redux';

// eslint-disable-next-line import/extensions
import store from './store/index.js';
// == compnent App && Loading
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
