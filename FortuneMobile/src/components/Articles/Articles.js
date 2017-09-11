'use strict';

import React from 'react';

import {
    StyleSheet, Text, View, TextInput, Button, TouchableOpacity, TouchableHighlight
} from 'react-native';
import { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import styles from './style';

class Articles extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{ marginTop: 5, color: '#ffffff', fontSize: 25, fontWeight: 'bold' }}>Articles</Text>
                </View>

                <View style={styles.userDetailContainer}>
                    <TextInput style={
                        styles.mobileTextInput
                    }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Mobile Number"
                        placeholderTextColor='#A7A7A7'
                    />
                    <TextInput style={
                        styles.mobileTextInput
                    }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Balance"
                        placeholderTextColor='#A7A7A7'
                    />
                    <View style={{ height: 2, backgroundColor: '#ffffff', marginTop: 20 }}></View>

                    <TextInput style={
                        styles.mobileTextInput
                    }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Article Name"
                        placeholderTextColor='#A7A7A7'
                    />
                    <TextInput style={
                        styles.mobileTextInput
                    }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Enter Quantity"
                        placeholderTextColor='#A7A7A7'
                    />
                    <TextInput style={
                        styles.mobileTextInput
                    }
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Enter Amount"
                        placeholderTextColor='#A7A7A7'
                    />


                    <View style={{
                        height: 60, flexDirection: 'row', marginTop: 30,
                    }}>
                        <TouchableHighlight
                            style={styles.save}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Save</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.next}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Next</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
module.exports = Articles;