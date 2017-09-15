import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 0,
        marginBottom: 0
    },
    mobileNumber: {
        flex: 1,
        fontSize: 20,
        marginLeft: 0,
        marginTop: 5,
        color: '#ffffff'

    }, mobileTextInput: {
        height: 40, backgroundColor: '#ffffff',
        marginLeft: 20, marginRight: 20, marginTop: 30,
        paddingLeft: 10, fontSize: 18
    },
    loginButton: {
        height: 60, backgroundColor: '#93E254',
        marginLeft: 20, marginRight: 20, marginTop: 30,
        fontSize: 25, textAlign: 'center', textAlignVertical: 'center',
        color: '#ffffff'
    }, userDetailContainer: {
        height: 40,
        marginTop:20
    }, save: {
        flex:1,
        marginLeft: 20,
        paddingLeft:30,
        marginRight:10,
        paddingRight:30,
        justifyContent: 'center',
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },next: {
        flex:1,
        marginRight:20,
        marginLeft:10,
        paddingLeft:30,
        paddingRight:30,
        justifyContent: 'center',
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    submitText: {
        color: '#fff',
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
