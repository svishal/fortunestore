/* import React from 'react';
import PulseLoader from 'react-native-pulse-loader';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { StyleSheet, View } from 'react-native';
import { WHITE } from '../../constants/colors';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    margin: 7,
    marginTop: 20,
  },
  contentLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function LoadingScreen() {
  return (
 
      <PulseLoader avatar={''} />
  );
}

module.exports = LoadingScreen;
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DoubleBounce } from 'react-native-loader';
import { WHITE, BRAND_PRIMARY } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    margin: 7,
    marginTop: 20,
  },
  contentLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.contentLoad}>
        <DoubleBounce size={10} color={BRAND_PRIMARY} />
      </View>
    </View>
  );
}

module.exports = LoadingScreen;