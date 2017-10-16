'use strict';
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, Alert, Image, FlatList, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { getCustomerId } from '../../modules/Articles/sagas';
import Prompt from 'react-native-prompt';

// import CheckBox from 'react-native-check-box';
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
      status: false
    };
    // this.addMoneyInCustomerAccount = this.addMoneyInCustomerAccount.bind(this);
    this.getLoginData = this.getLoginData.bind(this);
    this.fetchProductList = this.fetchProductList.bind(this);
    this.mobileNumberInput = this.mobileNumberInput.bind(this);
    this.getCustomerCredits = this.getCustomerCredits.bind(this);
    this.updateQuantityData = this.updateQuantityData.bind(this);
    this.nextButtonTapped = this.nextButtonTapped.bind(this);
    this.getCustomerData = this.getCustomerData.bind(this);
  }

  componentDidMount() {
    this.getLoginData();
    this.fetchProductList();
  }

  onButtonPressAdd = () => {
    // console.log('this.state.customerId &&&&&&', this.state.customerId)
    if (this.state.status === false) {
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
      var totalAmountToPay = 0;
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

mobileNumberInput = (customerMobileNumber) => {
  if (customerMobileNumber.length === 10) {
    console.log('10 digits ', customerMobileNumber);
    Alert.alert(
      'Confirm!',
      'Please confirm your mobile number.',
      [
        { text: 'OK', onPress: () => this.getCustomerCredits(customerMobileNumber) },
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

addMoneyInCustomerAccount = () => {
}

fetchProductList() {
  const { articlesListRequested } = this.props;
  articlesListRequested();
}

updateQuantityData = (array, enteredQuantity, index) => {
  const len = array.length;
  console.log(`Array data is -- ${array[index].product_name}`);
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
    const { articlesData, balanceData } = this.props;
    let bal = String(balanceData.current_balance);
    if (bal === 'undefined') {
      bal = '';
    } else {
      bal = `${bal} ₹`;
    }
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
      onChangeText={this.mobileNumberInput}
      />
      <View style={styles.addButtonContainer}>
      <TextInput
       style={styles.currentBalanceText}
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
                ref={component => this.textInput = component}
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
}

Articles.defaultProps = {
  error: null,
};

Articles.propTypes = {
  articlesListRequested: PropTypes.func.isRequired,
  getCustomerBalanceRequested: PropTypes.func.isRequired,
  error: PropTypes.string,
};

module.exports = Articles;
