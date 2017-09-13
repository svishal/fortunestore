'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import RouterComponent from './src/RouterComponent';
//import Payment from './src/components/Payment/Payment';
AppRegistry.registerComponent('FortuneStore', () => RouterComponent);
