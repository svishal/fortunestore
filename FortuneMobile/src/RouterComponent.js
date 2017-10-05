'use strict';

import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Login from './components/Login';
import Payment from './components/Payment';
import Articles from './components/Articles';
// import List from './components/list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
    marginBottom: 0,
  },
});

  const RouterComponent = () => (
      // <Provider store={store}>
        <Router style={styles.container}>
          <Scene key="root">
            {/* <Scene key="list" component={List} hideNavBar initial /> */}
            <Scene key="login" component={Login} hideNavBar initial />
            <Scene key="articles" component={Articles} hideNavBar />
            <Scene key="payment" component={Payment} hideNavBar />
          </Scene>
        </Router>
      // </Provider>
    );


module.exports = RouterComponent;
