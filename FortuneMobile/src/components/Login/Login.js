import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, TouchableOpacity, Text, AsyncStorage } 
from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import LoginStyle from './LoginStyle.js';

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
    const { loginInput, passwordInput } = this.state;
    const { loginRequest } = this.props;
    console.log(loginInput);
    loginRequest(loginInput, passwordInput);
  }

  render() {
    const { isPassword } = this.state;
    return (
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={LoginStyle.keyboardViewerStyle}
      scrollEnabled={false}
      >
      
      <View style={LoginStyle.container}>
      <Text style={LoginStyle.headerContent}> Fortune Store </Text>

      <TextInput 
      style={LoginStyle.input}
      underlineColorAndroid="transparent"
      placeholder="Phone Number"
      placeholderTextColor="#666564"
      autoCapitalize="none"
      keyboardType='phone-pad'
      onChangeText={username => this.setState({ loginInput: username })}
      />
  
      <TextInput 
      secureTextEntry={isPassword}
      style={LoginStyle.input}
      underlineColorAndroid='transparent'
      placeholder='Password'
      placeholderTextColor="#666564"
      autoCapitalize="none"
      onChangeText={password => this.setState({ passwordInput: password })}
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
}

Login.defaultProps = {
  error: null,
};

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Login;
