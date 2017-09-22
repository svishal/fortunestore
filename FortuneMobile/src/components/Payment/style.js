import { StyleSheet } from 'react-native';
import { WHITE, BLACK, LIGHT_GREY, GREY, BRAND_PRIMARY  } from '../../constants/colors';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        marginTop: 0,
        marginBottom: 0
    }, total: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
        paddingTop: 10,
        padding: 10,
        color: WHITE
    }, totalAmount: {
        flex: 1,
        fontSize: 22,
        marginLeft: 0,
        paddingTop: 10,
        padding: 10,
        fontWeight: 'bold',
        color: WHITE
    }, payContainer: {
        flex: 1, justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f44242'
    }, payText: {
        textAlignVertical: "center",
        textAlign: "center", color: BLACK,
        fontSize: 22
    }, lowerTab: {
        backgroundColor: BRAND_PRIMARY, flexDirection: 'row'
    }, itemText: {
        marginTop: 2, marginLeft: 10,
        fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center',
        color: BLACK
    }, itemQuantity: {
        marginTop: 6, marginLeft: 5, fontWeight: 'bold',
        fontSize: 15, textAlign: 'center', textAlignVertical: 'center',
        color: BLACK
    }, back: {
        fontSize: 18,
        marginLeft: 8,
        paddingTop: 10,
        paddingBottom: 10,
        color: WHITE
    }, topMobile: {
        flex: 1,
        fontSize: 18,
        paddingTop: 10,
        padding: 10,
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
        color: WHITE,
    }, topTab: {
        backgroundColor: WHITE,
        flexDirection: 'row',
        marginTop: 0
    },payBack:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});
export default style;