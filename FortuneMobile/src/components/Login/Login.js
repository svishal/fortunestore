import React, { Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Image, AlertIOS, Platform } from 'react-native'
import LoginStyle from './LoginStyle.js'
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile_number: '',
      password: '',
      data: [],
      platform: ''
    }
    this.validateFormData = this.validateFormDataAndProcess.bind(this);
  }

  handlePhoneNumber = (text) => {
    this.setState({ mobile_number: text })
  }

  handlePassword = (text) => {
    this.setState({ password: text })
  }

  validateFormDataAndProcess() {

    const { mobile_number } = this.state;
    const { password } = this.state;
    const { platform } = this.state;

    if (mobile_number == '') {
      AlertIOS.alert("Please Enter the Phone Number");
    }

    else if (password == '') {
      AlertIOS.alert("Please Enter the Password");
    }
    else {

      fetch('http://fortunestore.herokuapp.com/api/v1/login',
        {
          method: "POST",
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

          const { success } = JSON.stringify(responseJSON.success);

          if (success == true) {

            Actions.articles({ mobile_number: this.state.mobile_number })
          }
          else {
            Actions.articles({ mobile_number: this.state.mobile_number })
          }

        })

    }
  }
  render() {
    return (

      <View style={LoginStyle.container}>
        <Text style={LoginStyle.headerContent}> Fortune Store </Text>

        <TextInput style={LoginStyle.input}
          underlineColorAndroid="transparent"
          placeholder="Phone Number"
          placeholderTextColor="#666564"
          autoCapitalize="none"
          onChangeText={this.handlePhoneNumber} />

        <TextInput style={LoginStyle.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#666564"
          autoCapitalize="none"
          onChangeText={this.handlePassword} />

        <TouchableOpacity
          style={LoginStyle.submitButton}
          onPress={this.validateFormData}>
          <Text style={LoginStyle.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default Login;
