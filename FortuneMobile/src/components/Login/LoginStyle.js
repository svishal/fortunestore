/* import { StyleSheet } from 'react-native';
import { WHITE, GREY, BRAND_PRIMARY } from '../../constants/colors';

 const styles = StyleSheet.create({
   container: {
      paddingTop: 150,
      backgroundColor: WHITE,
      marginTop: 0,
      flex: 1,
      marginBottom: 0
   },

   imageWrapper:{
    alignItems:'center',
    width:200,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
logo:{
    width:201,
    alignItems:'center',
    height:75,
    marginTop:0,
    marginBottom:20,
  },
   loaderView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE
   },

   keyboardViewerStyle: {
    flex: 1,
    backgroundColor: WHITE,
    marginTop: 0,
    marginBottom: 0
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
      borderColor: GREY,
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center'
   },

   submitButton: {
      backgroundColor: BRAND_PRIMARY,
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius: 10,
   },

   submitButtonText: {
      color: WHITE,
      textAlign: 'center'
   }

});

export default styles;
 */

import { StyleSheet } from 'react-native';
import { WHITE, GREY, BRAND_PRIMARY, LIGHT_GREY, BLACK } from '../../constants/colors';


 const styles = StyleSheet.create({
   container: {
      paddingTop: 50,
      backgroundColor: WHITE,
      marginTop: 0,
      flex: 1,
      marginBottom: 0
   },

   imageWrapper: {
    alignItems: 'center',
    width: 375,
    backgroundColor: WHITE,
  },
  logo: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginTop: 0,
    marginBottom: 50,
  },
   loaderView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE
   },

   keyboardViewerStyle: {
    flex: 1,
    backgroundColor: WHITE,
    marginTop: 0,
    marginBottom: 0
   },

   headerContent: {
   marginTop: 20,
   margin: 5,
   textAlign: 'center',
   fontSize: 25,
   fontWeight: 'bold',
   },

   input: {
      margin: 15,
      height: 40,
      borderColor: GREY,
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center',
      color: BLACK
   },

   submitButton: {
      backgroundColor: BRAND_PRIMARY,
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius: 10,
   },

   submitButtonText: {
      color: WHITE,
      textAlign: 'center'
   }

});

export default styles;