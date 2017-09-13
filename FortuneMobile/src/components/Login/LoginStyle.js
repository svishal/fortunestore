import React, { Component } from 'react'
import { TextInput, View, StyleSheet,TouchableOpacity,Text, Image } from 'react-native'

 const styles = StyleSheet.create({
   container: {
      paddingTop: 150,
   },

   headerContent: {
   margin: 5,
   textAlign: 'center',
   fontSize: 25,
   fontWeight: 'bold',
   },

   input: {
      margin: 15,
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center'
   },

   forgotPassword: {
      height: 20,
      margin: 15,
      color: 'grey',
   },

   submitButton: {
      backgroundColor: '#0000FF',
      padding: 10,
      margin: 15,
      height: 40,
   },

   submitButtonText:{
      color: 'white',
      textAlign: 'center'
   }

})

export default styles