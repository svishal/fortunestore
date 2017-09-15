import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, ListView } from 'react-native';
import style from './style.js'
class Payment extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.QTY),
            total: 0
        };
        for (var i = 0; i < this.props.QTY.length; i++) {
            console.log('--------- Amount ----- ' + this.props.QTY[i].amount);
            this.state.total = parseInt(this.state.total) + (parseInt(this.props.QTY[i].amount) * parseInt(this.props.QTY[i].quantity));
            console.log('--------- Amount ----- ' + this.state.total);
        }
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffffff',
                marginTop: 0,
                marginBottom: 0
            }}>
                <View style={{ backgroundColor: '#000000', flexDirection: 'row' }}>
                    <Text style={{
                        flex: 1,
                        fontSize: 18,
                        marginLeft: 5,
                        paddingTop: 10,
                        paddingBottom: 10,
                        color: '#ffffff'
                    }}>Back</Text>
                    <Text style={{
                        flex: 1,
                        fontSize: 18,
                        paddingTop: 10,
                        padding: 10,
                        color: '#ffffff'
                    }}>9876543210</Text>
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
                            }}>{rowData.namee + ' :-'} </Text>
                                <View style={{ backgroundColor: '#000000' }}></View>
                                <Text style={{
                                    marginTop: 2, marginLeft: 5, fontWeight: 'bold',
                                    fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                    color: '#000000'
                                }}>{rowData.quantity + '  *'}</Text>
                                <Text style={{
                                    marginTop: 2, marginLeft: 5, fontWeight: 'bold',
                                    fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                    color: '#000000'
                                }}>{rowData.amount + '  = '}</Text>
                                <Text style={{
                                    marginTop: 2, marginLeft: 5, fontWeight: 'bold',
                                    fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                    color: '#000000'
                                }}>{rowData.amount * rowData.quantity}</Text>
                            </View>
                            <View style={{ height: 2, backgroundColor: '#000000', marginTop: 10 }}></View>
                        </View>
                    }
                />
                <View style={{ backgroundColor: '#000000', flexDirection: 'row' }}>
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
                    }}>{this.state.total}</Text>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#5942f4' }}>
                        <Text style={{ textAlignVertical: "center", textAlign: "center", color: '#000000', fontSize: 22 }}>Pay</Text>
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
