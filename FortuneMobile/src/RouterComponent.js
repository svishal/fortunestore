'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import RouterContent from './containers/RouterContent';
import store from './store';

const RouterComponent = () => (
  <Provider store={store}>
    <RouterContent />
  </Provider>
);
module.exports = RouterComponent;
