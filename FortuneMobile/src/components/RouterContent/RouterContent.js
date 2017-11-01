import React, { Component } from 'react';
import {
  StatusBar, StyleSheet, View, Platform, NetInfo, Alert } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Login from '../../containers/Login';
import Articles from '../../containers/Articles';
import Payment from '../../containers/Payment';
import { WHITE } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    marginTop: 0,
    marginBottom: 0,
    position: 'relative',
  },
  content: {
    backgroundColor: WHITE,
    marginTop: 0,
    position: 'relative',
  },
});

const cardStyle = {
  backgroundColor: WHITE,
};

const handleFirstConnectivityChange = (isConnected) => {
  if (!isConnected) {
    Alert.alert(
      'Oops!',
      'Seems like your internent is not working',
      [
        { text: 'OK', onPress: () => console.log('Internet not working') }
      ],
    );
  }
  NetInfo.isConnected.removeEventListener('change', handleFirstConnectivityChange);
};

class RouterContent extends Component {
  constructor() {
    super();
    this.onSceneChange = this.onSceneChange.bind(this);
  }

  onSceneChange() {
    this.props.updateScene(Actions.currentScene);
    if (Platform.OS === 'ios') {
      NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChange);
    } else {
      NetInfo.isConnected.fetch().then(
        (isConnected) => {
          if (!isConnected) {
            Alert.alert(
              'Oops!',
              'Seems like your internent is not working',
              [
                { text: 'OK', onPress: () => console.log('Internet not working') }
              ],
            );
          }
        }
      );
    }
  }

  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="default"
        />
        <Router style={styles.content} cardStyle={cardStyle}>
          <Scene key="root">
            
            {/* <Scene
              key="login"
              on={() => { this.onSceneChange(); }}
              component={Login}
              hideNavBar
            /> */}
            
            <Scene
              key="articles"
              on={() => { this.onSceneChange(); }}
              component={Articles}
              hideNavBar
            />
            <Scene
              key="payment"
              on={() => { this.onSceneChange(); }}
              component={Payment}
              hideNavBar
            />
          </Scene>
        </Router>
      </View>
    );
  }
}

RouterContent.propTypes = {
  updateScene: PropTypes.func.isRequired,
};

module.exports = RouterContent;
