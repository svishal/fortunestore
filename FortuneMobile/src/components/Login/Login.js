'use strict';

import React from 'react';

import {
    StyleSheet, Text, View, TextInput, Button, TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './style';

this.state = {
    route: 'Login',
    input: '{"mobile_number":4455667788,"password": "admin@123","device_type":"android", "device_id":"1234567890"}',
};

const Login = () => (
    <View style={styles.container}>
        <View style={{
            height: 60
        }}>
        </View>

        <View style={{ alignItems: 'center' }}>
            <Text style={{
                fontSize: 26,
                color: '#ffffff'
            }}> Fortune Store</Text>
        </View>


        <TextInput style={
            styles.loginTextInput
        }
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Mobile Number"
            placeholderTextColor='#A7A7A7'
            returnKeyType={"next"}
          
        />
        <TextInput style={
            styles.loginTextInput
        }
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            returnKeyType={"done"}
            placeholderTextColor='#A7A7A7'
        />
        <TouchableOpacity style={styles.item} onPress={() => props.login(this.state.input)}>
            <Text style={{
                height: 60, backgroundColor: '#93E254',
                marginLeft: 20, marginRight: 20, marginTop: 30,
                fontSize: 25, textAlign: 'center', textAlignVertical: 'center',
                color: '#ffffff'
            }}>Login
            console.log('-----------------------1111111111111111111111')</Text>
        </TouchableOpacity>

    </View>
);


function mapStateToProps(state) {
    return {
        appData: state.appData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: () => dispatch(login(this.state.input))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
module.exports = Login;