import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, ListView } from 'react-native';

class Payment extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'end', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2']),
        };
    }
    render() {
        return (

            <View style={{flex: 1}}>

                <View style={{height:60,backgroundColor: '#abccab',flexDirection:'row' }}>
                    <Text style={{
                        flex: 1,
                        fontSize: 18,
                        marginLeft:0,
                        textAlignVertical:'center',
                        paddingTop: 10,
                        padding:10,
                        color: '#ffffff'
                    }}>Back</Text>
                    <Text style={{
                        fontSize: 18,
                        marginLeft:0,
                        justifyContent:'center',
                        textAlignVertical:'center',
                        paddingTop: 10,
                        padding:10,
                        color: '#ffffff'
                    }}>9779780810</Text>

                </View>


                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                padding: 10
                            }}><Text style={{
                                marginTop: 2,
                                fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                color: '#000000'
                            }}>Article : </Text>
                                <Text style={{
                                    marginTop: 2,
                                    fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                    color: '#000000'
                                }}> Milk * 5 </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row', borderBottomWidth: 1, borderColor: "#000000",
                                padding: 10
                            }}><Text style={{
                                marginTop: 2,
                                fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                color: '#000000'
                            }}>Amount : </Text>
                                <Text style={{
                                    marginTop: 2,
                                    fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
                                    color: '#000000'
                                }}>  200 </Text>
                            </View>
                        </View>
                    }
                />
                <View style={{backgroundColor: '#abccab',flexDirection:'row' }}>
                    <Text style={{
                        flex: 1,
                        fontSize: 18,
                        marginLeft: 10,
                        paddingTop: 10,
                        padding:10,
                        color: '#ffffff'
                    }}>Total  :</Text>
                    <Text style={{
                        flex: 1,
                        fontSize: 18,
                        marginLeft: 10,
                        paddingTop: 10,
                        padding:10,
                        color: '#ffffff'
                    }}>5000</Text>

                     <Text style={{
                       borderRadius:20,
                       backgroundColor:'#123321',
                       borderColor:'#cbacba',
                       color:'#ffffff',
                       textAlign:'center',
                       paddingRight:20,
                       paddingLeft:20,
                    }}>Pay</Text>
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