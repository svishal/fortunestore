'use strict';

import React from 'react';

import {
  StyleSheet, Text, View, TextInput, Button, TouchableOpacity, TouchableHighlight, ToastAndroid, Alert, ScrollView,
} from 'react-native';
import { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import styles from './style';

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: '',
      inputQuantity: '',
      inputAmount: '',
      name: [],
      mobile: '',
      accessToken: this.props.access_token,
      currentBalance : '',
      customerId: '',
      balance: '0'

    };
    this.handleButtonChangeRetour = this.handleButtonChange.bind(this);
  }

  insertData = (tt, t, pr) => {
    //ToastAndroid.show(tt + ' ' + t + ' ' + pr, ToastAndroid.SHORT);
    console.log(tt + ' -- ' + t + ' -- ' + pr);
    var data = {
      namee: tt,
      quantity: t,
      amount: pr,
      custId: this.state.customerId
    }

    //console.log('-------Data--------' + data.namee);

    this.setState({
      name: [...this.state.name, data]
    })
    //console.log('-------State--------' +this.state.name.data.namee);
    var dd = this.state.name;
    console.log('----DD -----'+dd);
    // console.log('----DD Name-----'+dd.namee);
    this.clearText();
    // var rr = JSON.stringify(dd);
    // console.log(rr);
  }


  handleCustomerPhoneNumber = (text) => {
    if (text.length == 10 ) {
      this.getCustomerCurrentBalance(text)
    }
  }

  getCustomerCurrentBalance(text){

    fetch('http://fortunestore.herokuapp.com/api/v1/get_customer_balance',
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.accessToken
      },
      body: JSON.stringify({
        mobile_number: text
      })
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      if (responseJSON.success == true) {
        console.log('responseJSON.message +++++++++++ ' + responseJSON.data.current_balance);
        this.setState({customerId : responseJSON.data.id})
        
        if (responseJSON.data.is_new == false) {
          let bal = String(responseJSON.data.current_balance) + " ₹"
          this.setState({currentBalance : bal})

        }
      }
    })
  }

  addMoneyToCustomerAccount(balance){

      if (this.state.customerId.length>0) {
        fetch('http://fortunestore.herokuapp.com/api/v1/customers/' + this.state.customerId + '/money',
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.accessToken
          },
          body: JSON.stringify({
            balance: balance
          })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
          if (responseJSON.success == true) {
            console.log('responseJSON.message +++++++++++ ' + responseJSON.data.current_balance);
            this.setState({customerId : responseJSON.data.id})
            if (responseJSON.data.is_new == false) {
              let bal = String(responseJSON.data.current_balance) + " ₹"
              this.setState({currentBalance : bal})

            }
          }
        })
      }
      else {
        Alert.alert(
          'Oops!',
          'Customer not found, Please contact to admin',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        )
      }
  }



  handleName = (text) => {
    this.setState({ inputName: text })
  }

  handleQuantity = (text) => {
    this.setState({ inputQuantity: text })
  }
  handleAmount = (text) => {
    this.setState({ inputAmount: text })
  }

  handleButtonChange = () => {
    Actions.payment({ QTY: this.state.name })
  }

  clearText = () => {

    this._textInput1.setNativeProps({text: ''});
    this._textInput2.setNativeProps({text: ''});
    this._textInput3.setNativeProps({text: ''});
  }

  render() {
    return (

      <ScrollView style={styles.container}>
      <View style={styles.container}>
      <View style={{
        height: 30,
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ marginTop: 5, color: '#e52e2b', fontSize: 25, fontWeight: 'bold' }}>Articles</Text>
      </View>

      <View style={styles.userDetailContainer}>
      <TextInput style={
        styles.input
      }
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Mobile Number"
      placeholderTextColor='#A7A7A7'
      keyboardType = 'phone-pad'
      returnKeyType = 'next'
      maxLength = {10}
      onChangeText={this.handleCustomerPhoneNumber}

      />
      <TextInput style={
        styles.input
      }
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Balance"
      placeholderTextColor='#A7A7A7'
      editable={false}
      value={this.state.currentBalance}
      />
      <View style={{ height: 1, backgroundColor: '#4f4d4d', marginTop: 10 }}></View>

      <TextInput style={
        styles.input
      }
      ref={component => this._textInput1 = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Article Name"
      placeholderTextColor='#A7A7A7'
      returnKeyType = 'next'
      onChangeText={this.handleName}
      />
      <TextInput style={
        styles.input
      }
      ref={component => this._textInput2 = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Enter Quantity"
      returnKeyType = 'next'
      placeholderTextColor='#A7A7A7'
      onChangeText={this.handleQuantity}
      />
      <TextInput style={
        styles.input
      }
      ref={component => this._textInput3 = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Enter Amount"
      returnKeyType = 'done'
      placeholderTextColor='#A7A7A7'
      onChangeText={this.handleAmount}
      />


      <View style={{
        height: 40, flexDirection: 'row', marginTop: 30,
      }}>
      <TouchableHighlight
      style={styles.save}
      underlayColor='#fff'
      onPress={() => { this.insertData(this.state.inputName, this.state.inputQuantity, this.state.inputAmount) }}>
      <Text style={styles.submitText}>Save</Text>
      </TouchableHighlight>

      <TouchableHighlight
      style={styles.next}
      underlayColor='#fff'
      onPress={this.handleButtonChangeRetour}>
      <Text style={styles.submitText}>Next</Text>
      </TouchableHighlight>
      </View>
      </View>
      </View>
      </ScrollView>
    );
  }
}
module.exports = Articles;
