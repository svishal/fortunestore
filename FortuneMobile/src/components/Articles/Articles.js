'use strict';
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, Alert, ActivityIndicator
} from 'react-native';
import Prompt from 'react-native-prompt';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './style';
import { WHITE } from '../../constants/colors';


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
      isLoading: false,
      customerNumber: ''
    };
    this.handleButtonChangeRetour = this.handleButtonChange.bind(this);
    this.addMoneyInCustomerAccount = this.addMoneyInCustomerAccount.bind(this);
  }

  onButtonPressAdd = () => {
    // console.log('this.state.customerId &&&&&&', this.state.customerId)
    if (this.state.customerId !== '') {
    this.setState({
      promptVisible: true,
      balance: ''
    });
  } else {
    this.showAlertWithTitleAndMessage('Message!', 'Please check your account balance first via entering your phone number');
  }
  }

  getCustomerCurrentBalance(text) {
    console.log('********** + ', this.state.accessToken);
    this.setState({ isLoading: true });
    this.setState({ customerNumber: text });
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
      this.setState({ isLoading: false });
      this.setState({ customerNumber: text });
      if (responseJSON.success === true) {
        dismissKeyboard();
        console.log('Number ', this.state.customerNumber);
        // console.log('responseJSON.message +++++++++++ ' + responseJSON.data.current_balance);
        const customId = responseJSON.data.id;
        this.setState({ customerId: customId });
        // console.log('this.state.customerId +++++++++++ ' + this.state.customerId);
        if (responseJSON.data.is_new === false) {
          const serverBal = String(responseJSON.data.current_balance) + ' ₹';
          this.setState({ currentBalance: serverBal });
        }
      }
    });
  }
  handleCustomerPhoneNumber = (mobNum) => {
    if (mobNum.length === 10) {
      this.getCustomerCurrentBalance(mobNum);
    }
  }

  insertData = (tempItem, tempQuantity, tempAmount) => {
 let data;
    
    if (tempItem === '' || tempQuantity === '' || tempAmount === '') {
      this.showAlertWithTitleAndMessage('Oops!', 'Please enter the required information first.');
    } else {
       data = {
        item: tempItem,
        quantity: tempQuantity,
        amount: tempAmount * tempQuantity,
        singleAmount: tempAmount,
        custId: this.state.customerId,
        enteredMobNum: this.state.customerNumber
      };
      this.setState({
        name: [...this.state.name, data]
      });
      this.clearText();
    }
  }

  addMoneyInCustomerAccount = (bal) => {
    // console.log('this.state.balance wants to add+++++++++++ ' + bal);
    this.setState({
      promptVisible: false,
      message: 'Success',
      balance: bal,
    });
    // console.log('balbalbalbal+++++++++++ ' + bal);
    this.setState({ isLoading: true })
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
      this.setState({ isLoading: false });
      if (responseJSON.success === true) {
        const serverAddedMoney = String(responseJSON.data.current_balance) + ' ₹';
        this.setState({ currentBalance: serverAddedMoney });
        // console.log('responseJSON.message +++++++++++ ' + responseJSON.message);
      }
    });
  }

  showAlertWithTitleAndMessage(title, message) {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed!') },
      ]
    );
  }

  handleName = (text) => {
    this.setState({ inputName: text });
  }
  handleQuantity = (text) => {
    this.setState({ inputQuantity: text });
  }
  handleAmount = (text) => {
    this.setState({ inputAmount: text });
  }
  handleButtonChange = () => {
    if (this.state.name.length <= 0) {
      Alert.alert('Please enter item');
    } else {
      Actions.payment({ QTY: this.state.name });
      this.setState({ name: [] });
    }
  }
  clearText = () => {
    this.textInput1.setNativeProps({ text: '' });
    this.textInput2.setNativeProps({ text: '' });
    this.textInput3.setNativeProps({ text: '' });
  }

  render() {
   if (this.state.isLoading) {
      return (
        <View style={styles.loaderView}>
          <ActivityIndicator />
        </View>
      );
    }
    return (

      <KeyboardAwareScrollView
      style= {styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      >
      <View>
      <Prompt
      title="Amount"
      placeholder='Please Enter Amount '
      defaultValue=''
      keyboardType='phone-pad'
      visible={this.state.promptVisible}
      onCancel={() => this.setState({
        promptVisible: false,
        message: 'You cancelled'
      })}
      onSubmit={this.addMoneyInCustomerAccount}
      />

      <View style={styles.titleContainer}>
      <Text style={styles.titleLable}>Articles</Text>
      </View>
      <View style={styles.userDetailContainer}>
      <TextInput 
      style={
        styles.input
      }
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder='Mobile Number'
      placeholderTextColor='#A7A7A7'
      keyboardType='phone-pad'
      returnKeyType='next'
      maxLength={10}
      onChangeText={this.handleCustomerPhoneNumber}
      />
      <View style={styles.addButtonContainer}>
      <TextInput
       style={styles.currentBalanceText}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Balance"
      placeholderTextColor='#A7A7A7'
      editable={false}
      value={this.state.currentBalance}
      />
      <TouchableHighlight
      style={styles.addButton}
      underlayColor='#fff'
      onPress={this.onButtonPressAdd}
      >

      <Text
       style={{ color: '#fff', textAlign: 'center', fontSize: 15,
      }}
      >Add</Text>
      </TouchableHighlight>
      </View>
      <View 
      style={{ height: 1, backgroundColor: WHITE, marginTop: 30 }}
      >
      </View>
      <TextInput 
      style={
        styles.input
      }
      ref={component => this.textInput1 = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Article Name"
      placeholderTextColor='#A7A7A7'
      returnKeyType='next'
      onChangeText={this.handleName}
      />
      <TextInput 
      style={
        styles.input
      }
      ref={component => this.textInput2 = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Enter Quantity"
      returnKeyType='next'
      keyboardType='phone-pad'
      placeholderTextColor='#A7A7A7'
      onChangeText={this.handleQuantity}
      />
      <TextInput 
      style={
        styles.input
      }
      ref={component => this.textInput3 = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Enter Amount"
      returnKeyType='done'
      keyboardType='phone-pad'
      placeholderTextColor='#A7A7A7'
      onChangeText={this.handleAmount}
      />
      <View
       style={{
        height: 40, flexDirection: 'row', marginTop: 30,
      }}
      >
      <TouchableHighlight
      style={styles.save}
      underlayColor='#fff'
      onPress={() => { this.insertData(this.state.inputName, this.state.inputQuantity, this.state.inputAmount); }}
      >
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
