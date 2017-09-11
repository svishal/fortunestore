import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#26AE90',
        marginTop: 0,
        marginBottom: 0
    },
    loginTextInput: {
        height: 60, backgroundColor: '#ffffff',
        marginLeft: 20, marginRight: 20, marginTop: 30,
        paddingLeft: 10, fontSize: 20
    },
    loginButton: {
        height: 60, backgroundColor: '#93E254',
        marginLeft: 20, marginRight: 20, marginTop: 30,
        fontSize: 25, textAlign: 'center', textAlignVertical: 'center',
        color: '#ffffff'
    },    
});

export default styles;
