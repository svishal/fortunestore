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
  getData(){
    return fetch("http://thewallscript.com/blogfeed/javascript/10")
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({data: responseJSON.feed.entry});

      AlertIOS.alert(
       JSON.stringify(responseJSON.version)
      )
    })
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
      device_type : 'ios',
      device_id : '11111111111'
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


  login = (email, pass) => {
    if (email == '' || pass == '') {
      alert("Email or Password should not be Empty ");
    }
    else if (!this.validateEmail(email)) {
      alert("Please enter valid email ");

    }
    else {

      //this.callLoginApi(email, pass)
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  render() {

    console.log('---------------  Error ----  ' + this.state.data);

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
          onPress={() => this.validateFormDataAndProcess()}>
          <Text style={LoginStyle.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default Login;
