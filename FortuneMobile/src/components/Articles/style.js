import { StyleSheet } from 'react-native';
import { WHITE, BLACK, LIGHT_GREY, GREY, BRAND_PRIMARY  } from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        marginTop: 0,
        marginBottom: 0
    },

    loaderView : {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: WHITE
       },

       titleContainer :{
        height: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
       },
       titleLable : {
        marginTop: 5,
         color: BRAND_PRIMARY,
          fontSize: 25,
           fontWeight: 'bold'
       },

    mobileNumber: {
        flex: 1,
        fontSize: 20,
        marginLeft: 0,
        marginTop: 5,
        color: WHITE

    },
    
addButtonContainer : {
    flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 25
},

currentBalanceText : {
    flex: 1,
    height: 40,
    marginLeft: 15,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center'
},
    addButton: {
        flex: 0.50,
        height: 41,
        marginRight: 20,
        marginLeft: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        backgroundColor: BRAND_PRIMARY,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BRAND_PRIMARY
    },
    
    mobileTextInput: {
        height: 40, backgroundColor: WHITE,
        marginLeft: 20, marginRight: 20, marginTop: 30,
        paddingLeft: 10, fontSize: 18
    },
    loginButton: {
        height: 60, backgroundColor: '#93E254',
        marginLeft: 20, marginRight: 20, marginTop: 30,
        fontSize: 25, textAlign: 'center', textAlignVertical: 'center',
        color: WHITE
    }, userDetailContainer: {
        height: 40,
        marginTop:20
    },

     save: {
        flex:1,
        marginLeft: 20,
        paddingLeft:30,
        marginRight:10,
        paddingRight:30,
        justifyContent: 'center',
        backgroundColor: BRAND_PRIMARY,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: WHITE
    },next: {
        flex:1,
        marginRight:20,
        marginLeft:10,
        paddingLeft:30,
        paddingRight:30,
        justifyContent: 'center',
        backgroundColor: BRAND_PRIMARY,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: WHITE
    },
    submitText: {
        color: WHITE,
        textAlign: 'center',
        fontSize:20,
    },
      input: {
      margin: 15,
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center'
   }
});

export default styles;
