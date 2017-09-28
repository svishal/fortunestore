import React, { Component } from 'react';
import { TextInput, View, TouchableOpacity, Text, AsyncStorage, ActivityIndicator, Alert } 
from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import LoginStyle from './LoginStyle.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_number: '',
      password: '',
      data: [],
      platform: '',
      accessToken: '',
      isLoading: false
    };
    this.validateFormData = this.validateFormDataAndProcess.bind(this);
  }

  async setGlobalKey(value ,id) {
    try {
      await AsyncStorage.setItem('access_token', value);
      await AsyncStorage.setItem('fos_id', id);
    } catch (e) {
      console.log('caught error - - - - - - - ', e);
      // Handle exceptions
    }
  }

  async validateFormDataAndProcess() {
        try {
        const { mobileNumber } = this.state;
        const { password } = this.state;
    
        if (mobileNumber === '') {
          Alert.alert('Please Enter the Phone Number');
        } else if (password === '') {
          Alert.alert('Please Enter the Password');
        } else {
          this.setState({ isLoading: true });
          fetch('http://fortunestore.herokuapp.com/api/v1/login',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mobile_number: this.state.mobile_number,
              password: this.state.password,
              device_type: this.state.platform,
              device_id: DeviceInfo.getUniqueID()
            })
          })
          .then((response) => response.json())
          .then((responseJSON) => {
            this.setState({ isLoading: false });
            if (responseJSON.success === true) {
              this.setState({ access_token: responseJSON.data.access_token });
              this.setGlobalKey(responseJSON.data.access_token, responseJSON.data.id);
              Actions.articles({ access_token: this.state.access_token });
            } else {
              Alert.alert(responseJSON.message);
            }
          });
        }
      } catch (error) {
        console.error(error);
        this.setState({ visible: false });
      } 
      }

  handlePhoneNumber = (text) => {
    this.setState({ mobile_number: text });
  }

  handlePassword = (text) => {
    this.setState({ password: text });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={LoginStyle.loaderView}>
          <ActivityIndicator />
        </View>
      );
    }
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
      onChangeText={this.handlePhoneNumber}
      />

      <TextInput 
      secureTextEntry={true}
      style={LoginStyle.input}
      underlineColorAndroid="transparent"
      placeholder="Password"
      placeholderTextColor="#666564"
      autoCapitalize="none"
      onChangeText={this.handlePassword}
      />

      <TouchableOpacity
      style={LoginStyle.submitButton}
      onPress={this.validateFormData}
      >
      <Text style={LoginStyle.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>

      </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Login;
