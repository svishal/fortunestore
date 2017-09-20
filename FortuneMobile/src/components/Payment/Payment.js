import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, ListView, TouchableHighlight, AsyncStorage } from 'react-native';
import style from './style.js'
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

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
            visible: false
        };

        for (var i = 0; i < this.props.QTY.length; i++) {
            this.state.total = parseInt(this.state.total) + (parseInt(this.props.QTY[i].singleAmount) * parseInt(this.props.QTY[i].quantity));
        }
        this.getGlobalKeys();
    }

    callPaymentApi = () => {

        this.setState({ visible: true })
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
                this.setState({ visible: false })
                console.log('---------- Response --------- ', '  ' + responseJSON.message);
                if (responseJSON.success == true) {
                    alert('Your Payment is Done')
                    Alert.alert(
                        title,
                        message,
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

    render() {
        return (
            
            <View style={{
                flex: 1,
                backgroundColor: '#ffffff',
                marginTop: 0,
                marginBottom: 0
                
            }}
            
            >
                <View style={{ backgroundColor: '#e52e2b', flexDirection: 'row', marginTop: 20 }}>
                <TouchableHighlight
                onPress={() => { this.onPressBack() }}>
               
                <Text style={{
                
                    fontSize: 18,
                    marginLeft: 8,
                    paddingTop: 10,
                    paddingBottom: 10,
                    color: '#ffffff'
                }}>Back</Text>
                </TouchableHighlight>
                <Text style={{
                    flex: 1,
                    fontSize: 18,
                    paddingTop: 10,
                    padding: 10,
                    marginLeft: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#ffffff',
                    
                }}>{this.state.customerMob}</Text>
                </View>
                <ListView
                
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                padding: 10
                            }}><Text style={{
                                marginTop: 2, marginLeft: 10,
                                fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center',
                                color: '#000000'
                            }}>{rowData.item + ' :-'} </Text>
                                <View style={{ backgroundColor: '#000000' }}></View>
                                <Text style={{
                                    marginTop: 6, marginLeft: 5, fontWeight: 'bold',
                                    fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                    color: '#000000'
                                }}>{rowData.quantity + '  *'}</Text>
                                <Text style={{
                                    marginTop: 6, marginLeft: 5, fontWeight: 'bold',
                                    fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                    color: '#000000'
                                }}>{rowData.singleAmount + '  = '}</Text>
                                <Text style={{
                                    marginTop: 6, marginLeft: 5, fontWeight: 'bold',
                                    fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                    color: '#000000'
                                }}>{rowData.singleAmount * rowData.quantity} ₹ </Text>
                            </View>
                            <View style={{ height: 2, backgroundColor: '#000000', marginTop: 10 }}></View>
                        </View>
                    }
                />
                <View style={{ backgroundColor: '#e52e2b', flexDirection: 'row' }}>
                    <Text style={{
                        flex: 1,
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginLeft: 10,
                        paddingTop: 10,
                        padding: 10,
                        color: '#ffffff'
                    }}>Total  :-</Text>
                    <Text style={{
                        flex: 1,
                        fontSize: 22,
                        marginLeft: 0,
                        paddingTop: 10,
                        padding: 10,
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>{this.state.total} ₹</Text>
                    <View style={{
                        flex: 1, justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: '#f44242'
                    }}>
                        <TouchableHighlight
                            style={styles.next}
                            underlayColor='#fff'
                            onPress={() => { this.callPaymentApi() }}>
                            <Text style={{
                                textAlignVertical: "center",
                                textAlign: "center", color: '#000000',
                                fontSize: 22
                            }}>Pay</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
export default Payment
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
})
