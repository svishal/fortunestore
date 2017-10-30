'use strict';
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, Alert,
   Image, FlatList, AsyncStorage ,TouchableOpacity } from 'react-native';
import LoadingScreen from '../LoadingScreen';
import PropTypes from 'prop-types';
import Prompt from 'react-native-prompt';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SearchInput from '../SearchInput';
import styles from './style';
import { WHITE } from '../../constants/colors';
import iconFilter from '../../Assets/ic_filters.png';
import iconFilterActive from '../../Assets/ic_filters_active.png';

class Articles extends Component {

  static keyExtractor(item) {
    return item.id;
  }

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
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
      payAmount: ''
    };
    // this.addMoneyInCustomerAccount = this.addMoneyInCustomerAccount.bind(this);
    this.getLoginData = this.getLoginData.bind(this);
    this.fetchProductList = this.fetchProductList.bind(this);
    this.newAmountInput = this.newAmountInput.bind(this);
    this.getCustomerCredits = this.getCustomerCredits.bind(this);
    this.getCustomerData = this.getCustomerData.bind(this);
  }

  componentDidMount() {
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

  onButtonPressPay = () => {
    // console.log('this.state.customerId &&&&&&', this.state.customerId)
    if (this.state.payAmount.length === '') {
      this.showAlertWithTitleAndMessage('Message!',
      'Please enter the amount first');
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
  
getCustomerCredits = (searchText) => {
  // const { customerMobileNumber } = this.state;
  // const { getCustomerBalanceRequested } = this.props;
  // getCustomerBalanceRequested(customerMobileNumber);
  console.log('customerMobileNumber--- ' + searchText);
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

fetchProductList() {
  const { articlesListRequested } = this.props;
  articlesListRequested();
}

getButtonSearch() {
  const { activeFilter } = this.props;
  if (!activeFilter) {
    return (
      <TouchableOpacity
        style={styles.buttonFilter}
        activeOpacity={1}
      >
        <Image source={iconFilter} style={styles.iconFilter} />
        <Text style={styles.textButtonFilter}>Search</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.buttonFilter, styles.buttonFilterActive]}
      activeOpacity={1}
     >
      <Image source={iconFilterActive} style={styles.iconFilter} />
      <Text style={[styles.textButtonFilter, styles.textButtonFilterActive]}>Filters</Text>
    </TouchableOpacity>
  );
}

searchInput(textSearch) {
  this.setState({
    filterText: textSearch,
  }); 
}

newAmountInput = (newAmountText) => {
  console.log(`New amount entered is -- ${newAmountText}`);
  this.setState({
    payAmount: newAmountText,
  });
}

// Function is required in Prompt package, Either remove the package or defined the method 
addMoneyInCustomerAccount = () => {

} 
  render() {
    const { articlesData, balanceData, loading } = this.props;
    const { filterText } = this.state;
    let bal = String(balanceData.current_balance);
    console.log('Value in component ' + this.state.customerMobileNumber);
  //  this.showAlertWithTitleAndMessage('balance : ', bal);

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
      onSubmit={this.addMoneyInCustomerAccount} 
      />
      <View style={styles.titleContainer}>
      <Text style={styles.titleLable}>Articles</Text>
      </View>
      <View style={styles.barSearch}>
          <View style={styles.boxSearch}>
            <SearchInput
              debounceTime={300}
              handlerChange={this.searchInput}
              clearSearchMethod={this.clearFilter}
              defaultValue={filterText}
              placeholder={'Search Kothi/Mobile number'}
              returnKeyType="done"
              styleInput={styles.searchInput}
              styleIcon={styles.iconSearch}
              styleIconClose={styles.iconClose}
            />
          </View>
          <View style={styles.boxFilters}>
            {this.getButtonSearch()}
          </View>
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
            renderItem={({ item }) => (
              <View 
              style={styles.listContainerView}
              >
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemPrice}>{'9876543210'}</Text>
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
      keyboardType='phone-pad'
      returnKeyType='done'
      editable={false}
      value={this.state.customerMobileNumber}
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
       style={{ color: '#fff', textAlign: 'center', fontSize: 15,
      }}
      >Pay</Text>
      </TouchableHighlight>
      </View>
      <View 
      style={{ height: 1, backgroundColor: WHITE, marginTop: 30 }}
      >
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
