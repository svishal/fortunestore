import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, TouchableOpacity, Text, AsyncStorage, Alert, Image } 
from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingScreen from '../LoadingScreen';
import LoginStyle from './LoginStyle.js';
import logo from '../../Assets/logo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passwordInput: '',
      isPassword: true,
      data: [],
      platform: '',
      accessToken: '',
      deviceId: ''
    };
    this.login = this.login.bind(this);
  }

componentWillMount() {
  this.getLoginData();
}

  async getLoginData() {
    try {
      if (this.state.addMoneyStatus.length === 0) {
        const status = await AsyncStorage.getItem('addMoney:');
        if (status !== null) {
          if (status === 'inactive') {
            this.setState({ status: true });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  rememberMe() {
    
   }

  showPassword() {
    this.setState({
      isPassword: !this.state.isPassword,
    });
  }

  login() {
       const { username, passwordInput } = this.state;
       if (username.length === 0) {
        Alert.alert(
          'Message',
          'Please provide the your phone Number',
          [
            { text: 'OK', onPress: () => console.log('Error') }
          ],
        );
        return;
       } 
       if (passwordInput.length === 0) {
        Alert.alert(
          'Message',
          'Please provide the correct password',
          [
            { text: 'OK', onPress: () => console.log('Error') }
          ],
        );
        return;
       } 
       if (username.length !== 10) {
        Alert.alert(
          'Message',
          'Please provide the correct phone Number',
          [
            { text: 'OK', onPress: () => console.log('Error') }
          ],
        );
        return;
       } 
       const { loginRequest } = this.props;
       loginRequest(username, passwordInput);
     }

  render() {
    const { isPassword, username, passwordInput } = this.state;
    const { loading } = this.props;
    if (!loading) {
    return (
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={LoginStyle.keyboardViewerStyle}
      scrollEnabled={false}
      >

      <View style={LoginStyle.container}>
      <View style={LoginStyle.imageWrapper}>
      <Image
          style={LoginStyle.logo}
          source={logo}
       />
      </View>
      {/* <Text style={LoginStyle.headerContent}> Fortune Retail </Text> */}

      <TextInput 
      style={LoginStyle.input}
      underlineColorAndroid="transparent"
      placeholder="Phone Number"
      placeholderTextColor="#666564"
      autoCapitalize="none"
      keyboardType='phone-pad'
      onChangeText={loginInput => this.setState({ username: loginInput })}
      value={username}
      />
  
      <TextInput 
      secureTextEntry={isPassword}
      style={LoginStyle.input}
      underlineColorAndroid='transparent'
      placeholder='Password'
      placeholderTextColor="#666564"
      autoCapitalize="none"
      onChangeText={password => this.setState({ passwordInput: password })}
      value={passwordInput}
      />

      <TouchableOpacity
      style={LoginStyle.submitButton}
      onPress={this.login}
      >
      <Text style={LoginStyle.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>

      </View>
      </KeyboardAwareScrollView>
    );
  }
  return (
    <LoadingScreen />
  );
  }
}

Login.defaultProps = {
  error: null,
};

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Login;
