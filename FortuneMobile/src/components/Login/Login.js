import React, { Component } from 'react';
import { AppRegistry, TextInput, View, StyleSheet, TouchableOpacity, Text, Image , AlertIOS, Platform} from 'react-native'
import LoginStyle from './LoginStyle.js'
import { Actions } from 'react-native-router-flux';
var DeviceInfo = require('react-native-device-info'); // Need to recompile the souce with react-native run-ios
import {RNPrint} from 'NativeModules';

class Login extends Component {


  constructor(props){
      super(props)
      this.state = {
        mobile_number: '',
        password: '',
        data:[]
      }
    }

  componentDidMount () {
    // this.getData()
  console.log(Platform.OS)

}

  handlePhoneNumber = (text) => {
    this.setState({ mobile_number: text })
  }

  handlePassword = (text) => {
    this.setState({ password: text })
  }


validateFormDataAndProcess () {

  const { mobile_number }  = this.state ;
  const { password }  = this.state ;

if(mobile_number == '' )
{
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
      mobile_number : this.state.mobile_number,
      password : this.state.password,
      device_type : Platform.OS,
      device_id : DeviceInfo.getUniqueID()
    })
  })
  .then((response) => response.json())
  .then((responseJSON) => {

    const { success }  = JSON.stringify(responseJSON.success)  ;

    if (success == true) {

      AlertIOS.alert(
        "Success API -> " + JSON.stringify(responseJSON.message)
        //  Actions.articles
      )
    }
    else {
      AlertIOS.alert(
        "Error -> " + JSON.stringify(responseJSON.message)
      )
    }

  })

  }
}
  render() {
    return (

      <View style={LoginStyle.container}>
        <Text style ={LoginStyle.headerContent}> Fortune Store </Text>

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
          onPress={Actions.articles}>
          <Text style={LoginStyle.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default Login;
