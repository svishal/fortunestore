import React, { Component } from 'react';
import { Text, View, ListView, TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import style from './style.js';
import { BLACK, } from '../../constants/colors';

class Payment extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        
        this.state = {
            dataSource: ds.cloneWithRows(this.props.QTY),
            total: 0,
            purchased_items: [],
            access_token: '',
            customerMob: this.props.userDetails.exportedMobileNumber,
            fosId: '',
            isLoading: false,
            customerId: this.props.userDetails.exportedCustomerId,
            data: ''
        };
        this.goBack = this.goBack.bind(this);
        var tempTotal = 0;
        for (var i = 0; i < this.props.QTY.length; i++) {
            tempTotal = parseInt(this.state.total) + (parseInt(this.props.QTY[i].singleAmount) * parseInt(this.props.QTY[i].quantity));
        }
        
        this.state.total = tempTotal;
       // this.updateState = this.updateState.bind(this);

        this.getGlobalKeys();
    }
    // Back button press
    onPressBack = () => {
       this.goBack();
    }

    // Get the stored values
  async getGlobalKeys() {
    try {
        const value = await AsyncStorage.getItem('access_token');
        const storedFosId = await AsyncStorage.getItem('fos_id');
        // console.log('Access  ', ' ------------  ' + value);
        // console.log('storedFosId  ', ' ------------  ' + storedFosId);
        if (value !== null) {
        this.setState({
        access_token: value,
        fosId: storedFosId,

    });
        }
    } catch (error) {
        // Error retrieving data
        console.log('Error while retrieving data');
    }
}


    async setRemainBalance(value) {
        try {
          await AsyncStorage.setItem('remainBal', value);
          console.log('remainBal set - - - - - - - ', value);
        } catch (e) {
          console.log('caught error - - - - - - - ', e);
          // Handle exceptions
        }
      }

      // Go Back 
    goBack = () => {
         this.props.updateaction('Aman');
        // Actions.pop({ refresh: { amountToPaid: 5 } });
        // Actions.pop();
        this.updateParentState(data: 'test');
        this.setRemainBalance('5');
        // this.props.delivdate(date);
        Actions.pop({ amountToPaid: 5 });
    }
    updateParentState(data) {
        this.props.updateParentState(data);
    }

//updateState(date) {
   // console.log('Payment update');
   // this.props.action(date);
//}



callPaymentApi = () => {
    this.setState({ isLoading: true });
    fetch('http://fortunestore.herokuapp.com/api/v1/customers/' + this.state.customerId + '/expenditures',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.access_token
            },
            body: JSON.stringify({
                'fos_id': this.state.fosId,
                'order_date': '2017-09-04',
                'purchased_items': this.props.QTY,
                'total_amount': this.state.total
            })
        }).then((response) => response.json()).then((responseJSON) => {
            this.setState({ isLoading: false });
            // console.log('---------- Response --------- ', '  ' + responseJSON.message);
            if (responseJSON.success === true) {
                Alert.alert(
                    'Nice!',
                    'Your Payment is Done',
                    [
                      { text: 'OK', onPress: () => this.goBack() },
                    ]
                  );
            } else {
                Alert.alert(responseJSON.message);
            }
        });
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
                            <Text style={style.itemText}>{rowData.productName + ' :-'} </Text>
                                <View style={{ backgroundColor: BLACK }}></View>
                                <Text style={style.itemQuantity}>{rowData.quantity + '  *'}</Text>
                                <Text style={style.itemQuantity}>{rowData.singleAmount + '  = '}</Text>
                                <Text style={style.itemQuantity}>{rowData.singleAmount * rowData.quantity} ₹ </Text>
                            </View>
                            <View style={{ height: 2, backgroundColor: BLACK, marginTop: 10 }}></View>
                        </View>
                    }
                />
                <View style={style.lowerTab}>
                    <Text style={style.total}>Total  :-</Text>
                    <Text style={style.totalAmount}>{this.state.total} ₹</Text>
                    <View style={style.payContainer}>
                        <TouchableHighlight
                            style={style.payBack}
                            underlayColor='#fff'
                            onPress={() => { this.callPaymentApi(); }}
                            >
                            <Text style={style.payText}>Pay</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
export default Payment;