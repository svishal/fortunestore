'use strict';

import React from 'react';

import {
  StyleSheet, Text, View, TextInput, Button
} from 'react-native';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import Login from './components/Login';
import Payment from './components/Payment';
import Articles from './components/Articles';
import store from './store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
    marginBottom: 0,
  },
});

const RouterComponent = () => (
  <Provider store={store}>
    <Router style={styles.container}>
      <Scene key="root">
        <Scene key="login" component={Login} hideNavBar initial />
        <Scene key="articles" component={Articles} hideNavBar />
        <Scene key="payment" component={Payment} hideNavBar />
      </Scene>
    </Router>
  </Provider>
);

module.exports = RouterComponent;
