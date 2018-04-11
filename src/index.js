import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import setOrderId from './middlewares/setOrderId';


const store = createStore(
  reducers,
  applyMiddleware(setOrderId)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
