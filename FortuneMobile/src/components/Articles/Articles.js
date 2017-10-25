'use strict';
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, Alert,
   Image, FlatList, AsyncStorage } from 'react-native';
import LoadingScreen from '../LoadingScreen';
import PropTypes from 'prop-types';
import Prompt from 'react-native-prompt';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import styles from './style';
import { WHITE } from '../../constants/colors';

class Articles extends Component {

  static keyExtractor(item) {
    return item.id;
  }

  constructor(props) {
    super(props);
    this.state = {
      accessToken: this.props.access_token,
      currentBalance: '',
      customerId: '',
      promptVisible: false,
      isAddMoneyEnabled: true,
      customerMobileNumber: '',
      productArray: [],
      selectedProductsArray: [],
      addMoneyStatus: '',
      status: false,
      amount: ''
    };
    this.addMoneyInCustomerAccount = this.addMoneyInCustomerAccount.bind(this);
    this.getLoginData = this.getLoginData.bind(this);
    this.fetchProductList = this.fetchProductList.bind(this);
    this.mobileNumberInput = this.mobileNumberInput.bind(this);
    this.getCustomerCredits = this.getCustomerCredits.bind(this);
    this.updateQuantityData = this.updateQuantityData.bind(this);
    this.nextButtonTapped = this.nextButtonTapped.bind(this);
    this.getCustomerData = this.getCustomerData.bind(this);
  }

  componentDidMount() {
    // const { clearArticles } = this.props;
    // clearArticles();
    this.balance.setNativeProps({ text: '' });
    this.getLoginData();
    this.fetchProductList();
  }

  componentDidUpdate(prevProps) {
    const { addMessage, clearAddMessage } = this.props;
    const oldAddMessage = prevProps.addMessage;
    if (addMessage === 'success' && oldAddMessage === 'init') {
      clearAddMessage();
    }
  }

  onButtonPressAdd = () => {
    // console.log('this.state.customerId &&&&&&', this.state.customerId)
    if (this.state.status === true) {
      this.showAlertWithTitleAndMessage('Sorry!',
      'You can not add money for this customer');
      return;
    } 
    if (this.state.customerId !== '') {
          this.setState({
            promptVisible: true,
            balance: ''
          });
    } else {
       this.showAlertWithTitleAndMessage('Message!',
          'Please check your account balance first via entering your phone number');
     }
  }

  async getCustomerData() {
    try {
      if (this.state.customerId.length === 0) {
        const customerID = await AsyncStorage.getItem('customerId');
        if (customerID !== null) {
          this.setState({ customerId: customerID });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getLoginData() {
    this.balance.setNativeProps({ text: '' });
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
  
getCustomerCredits = (customerNumber) => {
  this.setState({ customerMobileNumber: customerNumber });
  const { customerMobileNumber } = this.state;
  const { getCustomerBalanceRequested } = this.props;
  getCustomerBalanceRequested(customerMobileNumber);
}

nextButtonTapped() {
  try {
    if (this.state.customerId.length !== 0) {
      const products = [];
      let totalAmountToPay = 0;
      for (let i = 0; i < this.state.productArray.length; i++) {
        const element = this.state.productArray[i];
        if (element.quantity.length !== 0) {
            totalAmountToPay = (element.quantity * element.amount) + totalAmountToPay;
            products.push(this.state.productArray[i]);
          }
      }
      const userInfo = {
          exportedMobileNumber: this.state.customerMobileNumber,
          exportedCustomerId: this.state.customerId
      };  
      console.log(userInfo);
      console.log(products);
      console.log(totalAmountToPay);
      Actions.payment({ QTY: products, userDetails: userInfo, amountToPaid: totalAmountToPay });
    } else {
      Alert.alert('Customer not found, Please enter your phone number first.');
    }
  } catch (error) {
    console.log(error);
  }
}

mobileNumberInput = (mobile) => {
  this.setState({ customerMobileNumber: mobile });
  if (mobile.length === 10) {
    console.log('10 digits ', mobile);
    Alert.alert(
      'Confirm!',
      'Please confirm your mobile number.',
      [
        { text: 'OK', onPress: () => this.getCustomerCredits(mobile) },
        { text: 'NO', onPress: () => console.log('No pressed') },
      ],
    );
  }
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

addMoneyInCustomerAccount = (amountToBePaid) => {
  this.setState({ promptVisible: false });
  this.setState({ amount: amountToBePaid }, function () {
    const { addBalanceRequested } = this.props;
    setTimeout(() => addBalanceRequested(this.state.customerId, this.state.amount), 10);
    // addBalanceRequested(this.state.customerId, this.state.amount);
});
}

fetchProductList() {
  const { articlesListRequested } = this.props;
  articlesListRequested();
}

updateQuantityData = (array, enteredQuantity, index) => {
  const len = array.length;
  // console.log(`Array data is -- ${array[index].product_name}`);
  this.props.articlesData[index].quantity = enteredQuantity;
  this.getCustomerData();
  if (this.state.productArray.length === 0) {
    let product; let i; let l;
    for (i = 0, l = len; i < l; i += 1) {
      product = {
        item: array[i].product_name,
        amount: array[i].price,
        quantity: ''
      };
      this.state.productArray.push(product);
    } 
  }
  this.state.productArray[index].quantity = enteredQuantity;
}

handleItemQuantity = (text, index) => {
  console.log(text, index);
  this.updateQuantityData(this.props.articlesData, text, index);
}

  render() {
    const { articlesData, balanceData, loading } = this.props;
    let bal = String(balanceData.current_balance);
    if (bal === 'undefined' || bal === '') {
      bal = '';
    } else {
      bal = `${bal} ₹`;
      this.getCustomerData();
    }

    if (!loading) {
    return (
      <KeyboardAwareScrollView
      style={styles.container}
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
      onSubmit={(amountToBePaid) => this.addMoneyInCustomerAccount(amountToBePaid)} 
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
      onChangeText={this.mobileNumberInput}
      value={this.state.customerMobileNumber}
      />
      <View style={styles.addButtonContainer}>
      <TextInput
       style={styles.currentBalanceText}
      ref={component => this.balance = component}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder='Balance'
      placeholderTextColor='#A7A7A7'
      editable={false}
      value={bal}
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

      {/* // List View Wrapper */}
      <View 
      style={styles.wrapperView}
      >
      <FlatList
            style={styles.listView}
            data={articlesData}
            keyExtractor={Articles.keyExtractor}
            enableEmptySections
            renderItem={({ item, index }) => (
              <View 
              style={styles.listContainerView}
              >
                <Image
                style={styles.itemImage}
                source={{ uri: item.image_url.trim() }}
                />
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemPrice}>{`${item.price} ₹`}</Text>
                <TextInput 
                style={styles.quantityInput}
                keyboardType='phone-pad'
                maxLength={2}
                placeholder='Quantity'
                onChangeText={(text) => this.handleItemQuantity(text, index)}
                />
                </View>
            )}
          />

      </View> 

       {/* Next View Button  */}
       <View
        style={{
         height: 40,
         flexDirection: 'row',
          marginTop: 20,
       }}
       >
       <TouchableHighlight
       style={styles.next}
       underlayColor='#fff'
       onPress={this.nextButtonTapped}
       >
       <Text style={styles.submitText}>Next</Text>
       </TouchableHighlight>
       
       </View>

       </View>
       </View>
       </KeyboardAwareScrollView>
    );
    }
  return (
    <LoadingScreen />
  );
  }
  
}

Articles.defaultProps = {
  error: null,
};

Articles.propTypes = {
  articlesListRequested: PropTypes.func.isRequired,
  addBalanceRequested: PropTypes.func.isRequired,
  getCustomerBalanceRequested: PropTypes.func.isRequired,
  error: PropTypes.string,
};

module.exports = Articles;
