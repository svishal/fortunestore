'use strict';
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import Prompt from 'react-native-prompt';
import { Text, View, TextInput, TouchableHighlight, 
Alert, FlatList, AsyncStorage } from 'react-native';
import LoadingScreen from '../LoadingScreen';
import SearchInput from '../SearchInput';
import styles from './style';

class Articles extends Component {
  static keyExtractor(item) {
    return item.id;
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      accessToken: this.props.access_token,
      currentBalance: '',
      customerId: '',
      promptVisible: false,
      customerMobileNumber: '',
      productArray: [],
      selectedProductsArray: [],
      addMoneyStatus: '',
      status: false,
      payAmount: ''
    };
    // this.addMoneyInCustomerAccount = this.addMoneyInCustomerAccount.bind(this);
    this.getLoginData = this.getLoginData.bind(this);
    this.newAmountInput = this.newAmountInput.bind(this);
    this.getButtonSearch = this.getButtonSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.onButtonPressPay = this.onButtonPressPay.bind(this);
  }

  componentDidMount() {
    this.getLoginData();
    // this.fetchProductList();
  }

  componentDidUpdate(prevProps) {
    const { addMessage, clearAddMessage } = this.props;
    const oldAddMessage = prevProps.addMessage;
    if (addMessage === 'success' && oldAddMessage === 'init') {
      clearAddMessage();
    }
  }

  onButtonPressPay() {
    // console.log('this.state.customerId &&&&&&', this.state.customerId)
    const { payAmount, customerId } = this.state;
    if (payAmount === '') {
      this.showAlertWithTitleAndMessage('Message!',
      'Please enter the amount first');
      return;
    } 
    if (customerId !== '') {
          this.setState({
            promptVisible: true,
            balance: ''
          });
    } else {
       this.showAlertWithTitleAndMessage('Message!',
          'Please check your account balance first via entering your phone number');
     }
  }

  async getLoginData() {
    console.log('Again calling');
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

getButtonSearch() {
  const { searchText } = this.state;
  if (searchText.length > 3) {
    const { getCustomerBalanceRequested } = this.props;
    getCustomerBalanceRequested(searchText);
  } else {
    console.log('Type more input for better result');
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

viewDetails(item) {
  const balance = String(item);
  this.setState({
    currentBalance: balance,
  });
}

searchInput(textSearch) { 
  if (textSearch.length > 3) {
    this.setState({ searchText: textSearch });
  }
  console.log(`Search text -- ${this.state.searchText}`);
}

newAmountInput(newAmountText) {
  console.log(`New amount entered is -- ${newAmountText}`);
  this.setState({
    payAmount: newAmountText
  });
}

// Function is required in Prompt package, Either remove the package or defined the method 
addMoneyInCustomerAccount() {

} 
clearSearch() {
  this.setState({
    currentBalance: '',
  });
}

  render() {
    const { balanceData, loading, error } = this.props;
    const { searchText, currentBalance } = this.state;
    console.log(`Error  is -- ${error}`);
    let bal = '';
    // let address = String(balanceData.address);
    // let mob = String(balanceData.mobile_number);
    if (currentBalance === 'undefined' || currentBalance === '') {
      bal = '';
    } else {
      bal = `${currentBalance} ₹`;
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
      onSubmit={this.addMoneyInCustomerAccount} 
      />
      <View style={styles.titleContainer}>
      <Text style={styles.titleLable}>Articles</Text>
      </View>
      <View style={styles.barSearch}>
          <View style={styles.boxSearch}>
            <SearchInput
              debounceTime={300}
              handlerChange={textSearch => this.searchInput(textSearch)}
              clearSearchMethod={this.clearSearch}
              defaultValue={searchText}
              placeholder={'Search Kothi/Mobile number'}
              returnKeyType="done"
              styleInput={styles.searchInput}
              styleIcon={styles.iconSearch}
              styleIconClose={styles.iconClose}
            />
          </View>
      <View style={styles.boxFilters}>
         <TouchableHighlight
         style={styles.buttonFilter}
          underlayColor='#fff'
          onPress={this.getButtonSearch}
         >
          <Text style={styles.textButtonFilter}>Search</Text>
          </TouchableHighlight>
          </View>
          </View>
      
      {/* // List View Wrapper */}
      <View 
      style={styles.wrapperView}
      >
      <FlatList
            style={styles.listView}
            data={balanceData}
            keyExtractor={Articles.keyExtractor}
            enableEmptySections
            renderItem={({ item }) => (
              <View 
              style={styles.listContainerView}
              >
                <Text style={styles.itemName}>{item.address}</Text>
                <Text style={styles.itemPrice}>{item.mobile_number} </Text>
                <Text style={styles.viewBalance}onPress={this.viewDetails.bind(this, item.current_balance)}>{'View Balance'}</Text>
                </View>
            )}
      />

      </View> 
      <View style={styles.userDetailContainer}>
      <TextInput 
      style={
        styles.input
      }
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder='Balance'
      placeholderTextColor='#A7A7A7'
      returnKeyType='done'
      editable={false}
      value={`${bal}`}
      />
      <View style={styles.addButtonContainer}>
      <TextInput
      style={styles.currentBalanceText}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder='Amount'
      placeholderTextColor='#A7A7A7'
      onChangeText={(newAmountText) => { this.newAmountInput(newAmountText); }}
      value={this.state.payAmount}
      />
      <TouchableHighlight
      style={styles.payButton}
      underlayColor='#fff'
      onPress={this.onButtonPressPay}
      >
    <Text
    style={{ color: '#fff', textAlign: 'center', fontSize: 15 }}
    >Pay</Text>
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
  getCustomerBalanceRequested: PropTypes.func.isRequired,
  error: PropTypes.string,
};

module.exports = Articles;
