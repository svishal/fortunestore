import React, { Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Image, AlertIOS, Platform, AsyncStorage, ActivityIndicator } from 'react-native'
import LoginStyle from './LoginStyle.js'
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { WHITE, BLACK, LIGHT_GREY, GREY, BRAND_PRIMARY  } from '../../constants/colors';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile_number: '',
      password: '',
      data: [],
      platform: '',
      accessToken: '',
      isLoading: false
    }
    this.validateFormData = this.validateFormDataAndProcess.bind(this);
  }


  handlePhoneNumber = (text) => {
    this.setState({ mobile_number: text })
  }

  handlePassword = (text) => {
    this.setState({ password: text })
  }

  async validateFormDataAndProcess() {

    try {
    const { mobile_number } = this.state;
    const { password } = this.state;
    const { platform } = this.state;
    const {accessToken} = this.state;

    if (mobile_number == '') {
      alert("Please Enter the Phone Number");
    }

    else if (password == '') {
      alert("Please Enter the Password");
    }
    else {
      this.setState({ isLoading: true })
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

        this.setState({ isLoading: false })
        if (responseJSON.success == true) {
          
          const {accessToken}  = JSON.stringify(responseJSON.data.access_token);
          this.setState({ access_token: responseJSON.data.access_token })
          this.setGlobalKey(responseJSON.data.access_token, responseJSON.data.id)
          Actions.articles({access_token : this.state.access_token })
        }
        else {
          
          alert(responseJSON.message);
        }

      })
    }
  }
  catch(error) {
    console.error(error);
    this.setState({ visible: false })
  } 
  }


  async setGlobalKey(value,id) {
    try {
      console.log('---------- access_token --------- ', '  ' + value);
      console.log('---------- access_token --------- ', '  ' + id);
      await AsyncStorage.setItem('access_token', value);
      await AsyncStorage.setItem('fos_id', id);
      var iii = await AsyncStorage.getItem('fos_id');
      console.log('fos_id Login   ', ' ------------  ' +iii );
    }
    catch (e) {
      console.log('caught error - - - - - - - ', e);
      // Handle exceptions
    }
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
      scrollEnabled={false}>

      <View style={LoginStyle.container}>
      <Text style={LoginStyle.headerContent}> Fortune Store </Text>

      <TextInput style={LoginStyle.input}
      underlineColorAndroid="transparent"
      placeholder="Phone Number"
      placeholderTextColor="#666564"
      autoCapitalize="none"
      keyboardType='phone-pad'

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
      </KeyboardAwareScrollView>
    );
  }
}

export default Login;
