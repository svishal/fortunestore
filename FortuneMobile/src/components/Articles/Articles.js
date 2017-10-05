'use strict';
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, Alert, ActivityIndicator, ListView, Image
} from 'react-native';
import Prompt from 'react-native-prompt';
// import CheckBox from 'react-native-check-box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './style';

import { WHITE, BLACK } from '../../constants/colors';


class Articles extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }); 
    this.state = {
      dataSource: ds.cloneWithRows(['row 1']),
      inputName: '',
      inputQuantity: '',
      inputAmount: '',
      singleAmount: '',
      accessToken: this.props.access_token,
      currentBalance: '',
      customerId: '',
      balance: '',
      promptVisible: false,
      isLoading: false,
      customerNumber: '',

      // CheckBox Props 
      checked: false,
      quantityText: '',
      productArray: [],
      productName: '',
      productPrice: '',
      productImageUrl: ''
    };
    this.handleButtonChangeRetour = this.handleButtonChange.bind(this);
    this.addMoneyInCustomerAccount = this.addMoneyInCustomerAccount.bind(this);
  }

  componentDidMount() {
    this.getProductList();
  }

  onButtonPressAdd = () => {
    // console.log('this.state.customerId &&&&&&', this.state.customerId)
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

//   onClick(data) {
//     console.log(data);

//     if (data.checked) {
//       var element = this.state.dataSource[data.index];
//       console.log(element);
//       element.checked = false;
//     }

//     if (data.checked === false) {
//       var element1 = this.state.dataSource[data.index];
//       console.log(element1);
//       this.setState(element1.checked = true);
//     }

//     data.checked = !data.checked;
//     console.log(data.index);

//     this.setState(dataSource[data.index].checked);
//     console.log(this.state.dataSource[data.index].checked);

//     const msg = data.checked ? 'you checked ' : 'you unchecked ';
//     console.log(data.productName);
//     console.log(msg);
// }

// Get Customer Balance
getCustomerCurrentBalance(text) {
  console.log('********** + ', this.state.accessToken);
  this.setState({ isLoading: true });
  this.setState({ customerNumber: text });
  fetch('http://fortunestore.herokuapp.com/api/v1/get_customer_balance',
  {
    method: 'POST',
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
        const serverBal = responseJSON.data.current_balance + '₹';
        this.setState({ currentBalance: serverBal });
      }
    }
  });
}

  // Get the Product List
  async getProductList() {
    console.log(this.state.accessToken);
    fetch('http://fortunestore.herokuapp.com/api/v1/product_list', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.state.accessToken
      }
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      if (responseJSON.success === true) {
        console.log(responseJSON.data.length);
        this.productDataModel(responseJSON.data);
      }
    });
  }

  // Get customer phone number  
  handleCustomerPhoneNumber = (mobNum) => {
    if (mobNum.length === 10) {
      this.getCustomerCurrentBalance(mobNum);
    }
  }

  handleItemQuantity = (quantity, index) => {
    if (quantity.length !== '') {
      console.log(quantity, index);
      const products = [...this.state.productArray];
      products[index].quantity = quantity;
      products[index].singleAmount = products[index].productPrice;
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.state.productArray) });
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
    this.setState({ isLoading: true });
    fetch('http://fortunestore.herokuapp.com/api/v1/customers/' + this.state.customerId + '/money',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer + this.state.accessToken'
      },
      body: JSON.stringify({
        balance: bal
      })
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({ isLoading: false });
      if (responseJSON.success === true) {
        const serverAddedMoney = responseJSON.data.current_balance + '₹';
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
    // console.log(this.state.productArray);
    if (this.state.customerId.length <= 0) {
      Alert.alert('Customer not found, Please enter your phone number first.');
    } else {
      const products = [];
      var totalAmountToPay = 0;
      for (let i = 0; i < this.state.productArray.length; i++) {
        const element = this.state.productArray[i];
        if (element.quantity.length !== 0) {
            totalAmountToPay = element.quantity * element.singleAmount;
            products.push(this.state.productArray[i]);
          }
      }
      const userInfo = {
          exportedMobileNumber: this.state.customerNumber,
          exportedCustomerId: this.state.customerId
      };  
      console.log('Total amount', totalAmountToPay);
      Actions.payment({ QTY: products, userDetails: userInfo });
    }
  }

  clearText = () => {
    this.textInput1.setNativeProps({ text: '' });
    this.textInput2.setNativeProps({ text: '' });
    this.textInput3.setNativeProps({ text: '' });
  }

  productDataModel = (array) => {
    const len = array.length;
    let product; let i; let l;
    for (i = 0, l = len; i < l; i += 1) {
      product = {
        productName: array[i].product_name,
        productPrice: array[i].price,
        checked: false,
        index: i,
        quantity: '',
        productImageUrl: array[i].image_url.trim()
      };
      this.state.productArray.push(product);
    } 
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.state.productArray) });
}

  // renderCheckBox(data) {
  //   return (
  //       <CheckBox
  //           style={styles.checkBox}
  //           onClick={() => this.onClick(data)}
  //           isChecked={data.checked}
  //           checkedImage={<Image source={require('../../Assets/check.png')} style={{ width: 32, height: 32 }} />}
  //           unCheckedImage={<Image source={require('../../Assets/uncheck.png')} style={{ width: 32, height: 32 }} />}
  //       />);
  // }

  render() {
  //  if (this.state.isLoading) {
  //     return (
  //       <View style={styles.loaderView}>
  //         <ActivityIndicator />
  //       </View>
  //     );
  //   }
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

      {/* // List View Wrapper */}
      <View 
      style={{ 
        height: 200,
        backgroundColor: WHITE,
        marginTop: 0,
      }}
      >
      <ListView
       style={{ 
        marginTop: 10,
      }}
      dataSource={this.state.dataSource}
      renderRow={
        (rowData) =>
        <View 
        style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: WHITE, alignItems: 'center' }}
        >

        <Image
          style={styles.itemImage}
          source={{ uri: rowData.productImageUrl }}
        />
        
         <Text style={styles.itemName}>{rowData.productName}</Text>
         <Text style={styles.itemPrice}>{rowData.productPrice + '₹'}</Text>
         <TextInput 
         style={styles.quantityInput}
         keyboardType='phone-pad'
         maxLength={2}
         placeholder='Quantity'
         onChangeText={(text) => this.handleItemQuantity(text, rowData.index)}
        />
        <View 
        style={{ height: 0.5, backgroundColor: BLACK, marginTop: 10 }}
        >
         </View>
      </View>}
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
       onPress={this.handleButtonChangeRetour}
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
module.exports = Articles;
