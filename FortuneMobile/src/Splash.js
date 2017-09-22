import React, { Component } from 'react';
import { AppRegistry, Text, Alert, View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Login from './components/Login';
import Payment from './components/Payment';
import Articles from './components/Articles';

class Splash extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
    this.getGlobalKeys()
  }
//   componentDidMount () {
//     setTimeout(function() { this.getGlobalKeys() }.bind(this), 3000);
// }

// Get the stored values
async getGlobalKeys() {
    try {
        const value = await AsyncStorage.getItem('access_token');
        if (value !== null) {
       // Move to Articles
            //  Actions.articles()
            const RouterComponent = () => (
                
                  // <Provider store={store}>
                    <Router style={styles.container}>
                      <Scene key="root">
                        
                        <Scene key="login" component={Login} hideNavBar initial />
                        <Scene key="articles" component={Articles} hideNavBar  />
                        <Scene key="payment" component={Payment} hideNavBar />
                      </Scene>
                    </Router>
                  // </Provider>
                );
        }
        else {
            // Move to Login
            
            const RouterComponent = () => (
                
                  // <Provider store={store}>
                    <Router style={styles.container}>
                      <Scene key="root">
                        
                        <Scene key="login" component={Login} hideNavBar />
                        <Scene key="articles" component={Articles} hideNavBar initial />
                        <Scene key="payment" component={Payment} hideNavBar />
                      </Scene>
                    </Router>
                  // </Provider>
                );
            // Actions.login()
        }
    } catch (error) {
        // Error retrieving data
        console.log("Error while retrieving data")
    }
}

}
module.exports = Splash;
// export default Splash;