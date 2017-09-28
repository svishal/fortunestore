import { StyleSheet } from 'react-native';
import { WHITE, GREY, BRAND_PRIMARY } from '../../constants/colors';

 const styles = StyleSheet.create({
   container: {
      paddingTop: 150,
      backgroundColor: WHITE,
      marginTop: 0,
      flex: 1,
      marginBottom: 0
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
