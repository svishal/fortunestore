import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, ListView, TouchableHighlight, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import style from './style.js'
import { Actions } from 'react-native-router-flux';
import { WHITE, BLACK, LIGHT_GREY, GREY, BRAND_PRIMARY  } from '../../constants/colors';

class Payment extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.QTY),
            total: 0,
            purchased_items: [],
            access_token: '',
            customerMob: this.props.QTY[0].enteredMobNum,
            fosId: '',
            isLoading: false
        };

        for (var i = 0; i < this.props.QTY.length; i++) {
            this.state.total = parseInt(this.state.total) + (parseInt(this.props.QTY[i].singleAmount) * parseInt(this.props.QTY[i].quantity));
        }
        this.getGlobalKeys();
    }

    callPaymentApi = () => {

        this.setState({ isLoading: true })
        fetch('http://fortunestore.herokuapp.com/api/v1/customers/' + this.props.QTY[0].custId + '/expenditures',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.access_token
                },
                body: JSON.stringify({
                    "fos_id": this.state.fosId,
                    "order_date": "2017-09-04",
                    "purchased_items": this.props.QTY,
                    "total_amount": this.state.total
                })
            }).then((response) => response.json()).then((responseJSON) => {
                this.setState({ isLoading: false })
                console.log('---------- Response --------- ', '  ' + responseJSON.message);
                if (responseJSON.success == true) {
    
                    Alert.alert(
                        'Nice!',
                        'Your Payment is Done',
                        [
                          { text: 'OK', onPress: () => Actions.pop() },
                        ]
                      )
                }
                else {
                    alert(responseJSON.message)
                }
            })
    }
    // Get the stored values
    async getGlobalKeys() {
        try {
            const value = await AsyncStorage.getItem('access_token');
            const storedFosId = await AsyncStorage.getItem('fos_id');
            console.log('Access  ', ' ------------  ' + value);
            console.log('storedFosId  ', ' ------------  ' + storedFosId);
            if (value !== null) {
            this.setState({
            access_token:value,
            fosId: storedFosId,

        })
            }
        } catch (error) {
            // Error retrieving data
            console.log("Error while retrieving data")
        }
    }

    onPressBack = () => {
        Actions.pop()
       
    }

    deleteNote = () => {
        console.log('Delete')
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.topTab}>
                    <TouchableHighlight
                        onPress={() => { this.onPressBack() }}>
                        <Text style={style.back}>Back</Text>
                    </TouchableHighlight>
                    <Text style={style.topMobile}>{this.state.customerMob}</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                padding: 10
                            }}><Text style={style.itemText}>{rowData.item + ' :-'} </Text>
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
                            onPress={() => { this.callPaymentApi() }}>
                            <Text style={style.payText}>Pay</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
export default Payment