'use strict';
import React from 'react';
import {
  StyleSheet, Text, View, TextInput, Button, TouchableOpacity, TouchableHighlight, ToastAndroid, Alert, ScrollView,KeyboardAvoidingView, Keyboard
} from 'react-native';
import { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import styles from './style';
import Prompt from 'react-native-prompt';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      inputQuantity: '',
      inputAmount: '',
      singleAmount: '',
      name: [],
      mobile: '',
      accessToken: this.props.access_token,
      currentBalance: '',
      customerId: '',
      balance: '',
      promptVisible: false,
      visible: false,
      customerNumber: ''
    };
    this.handleButtonChangeRetour = this.handleButtonChange.bind(this);
    this.showPopUp = this.showPopUp.bind(this);

  }

  insertData = (tempItem, tempQuantity, tempAmount) => {

    if (tempItem == '' || tempQuantity== '' || tempAmount == '') {
      this.showAlertWithTitleAndMessage('Oops!','Please enter the required information first.')
    }
    else {
      var data = {
        item: tempItem,
        quantity: tempQuantity,
        amount: tempAmount * tempQuantity,
        singleAmount: tempAmount,
        custId: this.state.customerId,
        enteredMobNum: this.state.customerNumber
      }
      this.setState({
        name: [...this.state.name, data]
      })
      this.clearText();
    }
  }


  handleCustomerPhoneNumber = (text) => {
    if (text.length == 10) {
      this.getCustomerCurrentBalance(text)
    }
  }
  getCustomerCurrentBalance(text) {

    console.log('********** + ', this.state.accessToken)
    this.setState({ visible: true })
    this.setState({customerNumber:text})
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
      this.setState({ visible: false })
      if (responseJSON.success == true) {
        Keyboard.dismiss
        console.log('responseJSON.message +++++++++++ ' + responseJSON.data.current_balance);
        let customId = responseJSON.data.id
        this.setState({ customerId: customId })
        console.log('this.state.customerId +++++++++++ ' + this.state.customerId);
        if (responseJSON.data.is_new == false) {
          let serverBal = String(responseJSON.data.current_balance) + " ₹"
          this.setState({ currentBalance: serverBal })
        }
      }
    })
  }

  showPopUp = (bal) => {

    // console.log('this.state.balance wants to add+++++++++++ ' + bal);
    this.setState({
      promptVisible: false,
      message: "Success",
      balance: bal,
    })
    console.log('balbalbalbal+++++++++++ ' + bal);
    this.setState({ visible: true })
    fetch('http://fortunestore.herokuapp.com/api/v1/customers/' + this.state.customerId + '/money',
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.accessToken
      },
      body: JSON.stringify({
        balance: bal
      })
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({ visible: false })
      if (responseJSON.success == true) {
        let serverAddedMoney = String(responseJSON.data.current_balance) + " ₹"
        this.setState({ currentBalance: serverAddedMoney })
        console.log('responseJSON.message +++++++++++ ' + responseJSON.message);
      }
    })
  }

  onButtonPressAdd = () => {

    console.log('this.state.customerId &&&&&&', this.state.customerId)
    if (this.state.customerId != '' ) {
    this.setState({
      promptVisible: true,
      balance: ''
    });
  }
  else {
    this.showAlertWithTitleAndMessage('Message!', 'Please check your account balance first via entering your phone number')
  }
  }

  showAlertWithTitleAndMessage(title, message) {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed!') },
      ]
    )
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
    if (this.state.name.length <= 0) {
      alert('Please enter item');
    } else {
      Actions.payment({ QTY: this.state.name });
      this.setState({ name: [] });
    }
  }
  clearText = () => {
    this._textInput1.setNativeProps({ text: '' });
    this._textInput2.setNativeProps({ text: '' });
    this._textInput3.setNativeProps({ text: '' });
  }

  render() {
    return (

      <KeyboardAwareScrollView
      style= {styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <View>

      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#e52e2b'}} />
      <Prompt
      title="Amount"
      placeholder="Please Enter Amount "
      defaultValue=""
      keyboardType='phone-pad'
      visible={this.state.promptVisible}
      onCancel={() => this.setState({
        promptVisible: false,
        message: "You cancelled"
      })}
      onSubmit={this.showPopUp} />

      <View style={{
        height: 30,
        marginTop: 20,
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
      keyboardType='phone-pad'
      returnKeyType='next'
      maxLength={10}
      onChangeText={this.handleCustomerPhoneNumber}
      />
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 25 }}>
      <TextInput style={
        {
          flex: 1,
          height: 40,
          marginLeft: 15,
          borderColor: 'grey',
          borderWidth: 1,
          borderRadius: 10,
          textAlign: 'center'
        }
      }
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Balance"
      placeholderTextColor='#A7A7A7'
      editable={false}
      value={this.state.currentBalance}
      />
      <TouchableHighlight
      style={{
        flex: 0.50,
        height: 41,
        marginRight: 20,
        marginLeft: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        backgroundColor: '#e52e2b',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e52e2b'
      }}
      underlayColor='#fff'
      onPress={this.onButtonPressAdd}>

      <Text style={{
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
      }}>Add</Text>
      </TouchableHighlight>
      </View>
      <View style={{ height: 1, backgroundColor: '#ffffff', marginTop: 30 }}></View>
      <TextInput style={
        styles.input
      }
      ref={component => this._textInput1 = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Article Name"
      placeholderTextColor='#A7A7A7'
      returnKeyType='next'
      onChangeText={this.handleName}
      />
      <TextInput style={
        styles.input
      }
      ref={component => this._textInput2 = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Enter Quantity"
      returnKeyType='next'
      keyboardType='phone-pad'
      placeholderTextColor='#A7A7A7'
      onChangeText={this.handleQuantity}
      />
      <TextInput style={
        styles.input
      }
      ref={component => this._textInput3 = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Enter Amount"
      returnKeyType='done'
      keyboardType='phone-pad'
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
      </KeyboardAwareScrollView>
    );
  }
}
module.exports = Articles;
