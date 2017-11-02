import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView, TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import style from './style.js';
import { GREY, BLACK } from '../../constants/colors';


class Payment extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            data: '',
            amountToBePaid: this.props.amountToPaid,
            fosId: '',
            access_token: '',
            purchased_items: [],
            dataSource: ds.cloneWithRows(this.props.QTY),
            customerMob: this.props.userDetails.exportedMobileNumber,
            customerId: this.props.userDetails.exportedCustomerId,
            selectedItemsArray: []
        };
        this.goBack = this.goBack.bind(this);
        this.payment = this.payment.bind(this);
        this.getFosIdKeys();
    }

    componentDidMount = () => {
        const tempArray = [];
        for (let i = 0; i < this.props.QTY.length; i++) {
            const element = this.props.QTY[i];
            console.log(`Element is ${element}`);
            tempArray.push(element);
          }
        this.setState({ selectedItemsArray: tempArray });
        console.log(tempArray);
    }

    // Back button press
    onPressBack = () => {
       this.goBack();
    }
    // Get the stored values
    async getFosIdKeys() {
        try {
        const value = await AsyncStorage.getItem('fosId');
        console.log('Fos  ', value);
        this.setState({ fosId: value });
        } catch (error) {
            console.log(`Error while retrieving data ${error}`);
        }
    }

      // Go Back 
    goBack = () => {
        Actions.pop();
    }
   
    payment() {
        // this.setState({ selectedItemsArray: this.props.QTY });
        if (this.state.selectedItemsArray.length !== 0) {
        const { fosId, customerId, selectedItemsArray, amountToBePaid } = this.state;
        // const { paymentRequested } = this.props;
        // paymentRequested(fosId, customerId, selectedItemsArray, amountToBePaid);
        } else {
            Alert.alert(
                'Oops!',
                'Sorry',
                [
                    { text: 'OK', onPress: () => console.log('Payment') },
                ]
                );
            } 
        }

    deleteNote = () => {
        console.log('Delete');
    }

   render() {

        return (
            <View style={style.container}>
                <View style={style.topTab}>
                    <TouchableHighlight
                        onPress={() => { this.onPressBack(); }}
                        >
                        <Text style={style.back}>Back</Text>
                    </TouchableHighlight>
                    <Text style={style.topMobile}>{this.state.customerMob}</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <View 
                            style={{
                                flexDirection: 'row',
                                padding: 10
                            }}>
                            <Text style={style.itemText}>{`${rowData.item}`} </Text>
                                <View style={{ backgroundColor: BLACK }}></View>
                                <Text style={style.itemTotal}>{`${rowData.quantity} * ${rowData.amount} = ${rowData.amount * rowData.quantity} ₹`}</Text>
                            </View>
                            {/* <View style={{ height: 0.7, backgroundColor: GREY, marginTop: 10 }}></View> */}
                        </View>
                    }
                />
                <View style={style.lowerTab}>
                    <Text style={style.total}>Total  :-</Text>
                    <Text style={style.totalAmount}>{this.state.amountToBePaid} ₹</Text>
                    <View style={style.payContainer}>
                        <TouchableHighlight
                            style={style.payBack}
                            underlayColor='#fff'
                            onPress={() => { this.payment(); }}
                            >
                            <Text style={style.payText}>Pay</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
       
}

Payment.defaultProps = {
    error: null,
  };
  
  Payment.propTypes = {
    paymentRequested: PropTypes.func.isRequired,
    // getUpdatedBalance: PropTypes.func.isRequired,
    addMessage: PropTypes.string.isRequired,
    error: PropTypes.string,
  };


export default Payment;
