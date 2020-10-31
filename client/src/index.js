import React from 'react';
import ReactDOM from 'react-dom';

// == redux
import { Provider } from 'react-redux';
import store from './store/index.js';


import App from './App/App';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));