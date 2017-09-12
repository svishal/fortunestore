import React, { Component } from 'react';
import { AppRegistry, TextInput, View, StyleSheet, TouchableOpacity, Text, Image , AlertIOS,} from 'react-native'
import LoginStyle from './LoginStyle.js'

class Login extends Component {

  state = {
    email: 'sam@gmail.com',
    password: '123456'
  }


constructor () {
  super()
  this.state ={
    data:[]
  }
}

  componentDidMount () {
    // this.getData()
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


  handleEmail = (text) => {
    this.setState({ email: text })
  }

  handlePassword = (text) => {
    this.setState({ password: text })
  }


  handleData = (text) => {


     fetch('http://fortunestore.herokuapp.com/api/v1/login',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({
         mobile_number : '9888980589',
         password : '123',
         device_type : 'iOS',
         device_id : '1234567890'
       })

    })
     .then((response) => response.json())
     .then((responseJSON) => {
       AlertIOS.alert(
         "Response Body -> " + JSON.stringify(responseJSON.message)
       )
     })
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
          onChangeText={this.handleEmail} />

        <TextInput style={LoginStyle.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#666564"
          autoCapitalize="none"
          onChangeText={this.handlePassword} />

        <TouchableOpacity
          style={LoginStyle.submitButton}
          onPress={() => this.handleData()}>
          <Text style={LoginStyle.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default Login;
