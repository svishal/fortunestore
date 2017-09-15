'use strict';

import React from 'react';

import {
    StyleSheet, Text, View, TextInput, Button, TouchableOpacity, TouchableHighlight, ToastAndroid
} from 'react-native';
import { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import styles from './style';

class Articles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputName: '',
            inputQuantity: '',
            inputAmount: '',
            name: [],
            mobile: this.props.mobile_number,
        };
        this.handleButtonChangeRetour = this.handleButtonChange.bind(this);
    }

    componentDidMount()
    {
      this.getCustomerCurrentBalance()
    }

    insertData = (tt, t, pr) => {
        //ToastAndroid.show(tt + ' ' + t + ' ' + pr, ToastAndroid.SHORT);
        console.log(tt + ' -- ' + t + ' -- ' + pr);
        var data = {
            namee: tt,
            quantity: t,
            amount: pr
        }

        //console.log('-------Data--------' + data.namee);

        this.setState({
            name: [...this.state.name, data]
        })
        //console.log('-------State--------' +this.state.name.data.namee);
         var dd = this.state.name;
         console.log('----DD -----'+dd);
        // console.log('----DD Name-----'+dd.namee);
        this.clearText();
        // var rr = JSON.stringify(dd);
        // console.log(rr);
    }


    getCustomerCurrentBalance(){

          fetch('http://fortunestore.herokuapp.com/api/v1/get_customer_balance',
            {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                mobile_number: this.state.mobile
              })
            })
            .then((response) => response.json())
            .then((responseJSON) => {
              alert(responseJSON)
              console.log(responseJSON);
            })
          }



    handleName = (text) => {
        this.setState({ inputName: text })
    }

    handleQuantity = (text) => {
        this.setState({ inputQuantity: text })
    }
    handleAmount = (text) => {
        this.setState({ inputAmount: text })
    }

    handleButtonChange = () => {
        Actions.payment({ QTY: this.state.name })
    }

    clearText = () => {

      alert(this.state.mobile)
    // this._textInput1.setNativeProps({text: ''});
    // this._textInput2.setNativeProps({text: ''});
    // this._textInput3.setNativeProps({text: ''});
  }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    height: 30,
                    marginTop:20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{ marginTop: 5, color: '#68a0cf', fontSize: 25, fontWeight: 'bold' }}>Articles</Text>
                </View>

                <View style={styles.userDetailContainer}>
                    <TextInput style={
                        styles.input
                    }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Mobile Number"
                        placeholderTextColor='#A7A7A7'
                        value={this.state.mobile}
                    />
                    <TextInput style={
                        styles.input
                    }


                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Balance"
                        placeholderTextColor='#A7A7A7'

                    />
                    <View style={{ height: 2, backgroundColor: '#68a0cf', marginTop: 10 }}></View>

                    <TextInput style={
                        styles.input
                    }
                        ref={component => this._textInput1 = component}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Article Name"
                        placeholderTextColor='#A7A7A7'
                        onChangeText={this.handleName}
                    />
                    <TextInput style={
                        styles.input
                    }
                        ref={component => this._textInput2 = component}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Enter Quantity"
                        placeholderTextColor='#A7A7A7'
                        onChangeText={this.handleQuantity}
                    />
                    <TextInput style={
                        styles.input
                    }
                        ref={component => this._textInput3 = component}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Enter Amount"
                        placeholderTextColor='#A7A7A7'
                        onChangeText={this.handleAmount}
                    />


                    <View style={{
                        height: 60, flexDirection: 'row', marginTop: 30,
                    }}>
                        <TouchableHighlight
                            style={styles.save}
                            underlayColor='#fff'
                            onPress={() => { this.insertData(this.state.inputName, this.state.inputQuantity, this.state.inputAmount) }}>
                            <Text style={styles.submitText}>Save</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.next}
                            underlayColor='#fff'
                            onPress={this.handleButtonChangeRetour}>
                            <Text style={styles.submitText}>Next</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
module.exports = Articles;
