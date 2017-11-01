import { StyleSheet } from 'react-native';
import { WHITE, BLACK, GREY, BRAND_PRIMARY, NAVBAR, GREY_MEDIUM } from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        marginTop: 0,
        marginBottom: 0
    },

    loaderView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: WHITE
    },

    barSearch: {
        backgroundColor: NAVBAR,
        borderTopWidth: 1,
        borderColor: GREY_MEDIUM,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
      },
      boxSearch: {
        flex: 1,
      },
      searchInput: {
        height: 35,
        fontSize: 14,
        color: BLACK,
      },
      iconSearch: {
        top: 4,
      },
      iconClose: {
        top: 4,
      },
      buttonFilter: {
        flexDirection: 'row',
        backgroundColor: GREY,
        alignSelf: 'center',
        paddingTop: 4,
        paddingRight: 15,
        paddingLeft: 10,
        height: 35,
        borderRadius: 4,
        marginLeft: 10,
      },
      buttonFilterActive: {
        backgroundColor: BLACK,
      },
      iconFilter: {
        width: 24,
        height: 24,
      },
      textButtonFilter: {
        color: WHITE,
        fontSize: 14,
        paddingLeft: 9,
        paddingTop: 4,
      },
      textButtonFilterActive: {
        color: WHITE,
      },

    titleContainer: {
        height: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleLable: {
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
    
    addButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 25
    },

    currentBalanceText: {
        flex: 1,
        height: 40,
        marginLeft: 15,
        borderColor: GREY,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        color: BLACK
    },
    payButton: {
        flex: 0.50,
        height: 41,
        marginRight: 8,
        marginLeft: 8,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        backgroundColor: BRAND_PRIMARY,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BRAND_PRIMARY
    },
    
    mobileTextInput: {
        height: 40,
        backgroundColor: WHITE,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 30,
        paddingLeft: 10,
        fontSize: 18
    },
    
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 25, 
        borderColor: GREY,
        marginLeft: 8
    },
    itemName: {
        flex: 0.50,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: BLACK
    },
    itemPrice: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 5,
        marginRight: 8,
        fontSize: 13,
        color: GREY,
        fontWeight: 'bold',
    },
    viewBalance: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 5,
        marginRight: 8,
        fontSize: 13,
        color: BRAND_PRIMARY,
        fontWeight: 'bold',
    },
    listContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    alignItems: 'center'
    },
    searchMobileNumber: {
         flex: 0.20,
         backgroundColor: WHITE,
         marginTop: 10,
         marginBottom: 10,
         marginLeft: 10,
         marginRight: 10,
         borderColor: GREY,
         textAlign: 'center',
         fontSize: 12,
         color: BLACK
    },

    checkBox: {
        marginRight: 20,
        padding: 10
    },

    input: {
        margin: 15,
        height: 40,
        borderColor: GREY,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 10,
        color: BLACK
     },
     userDetailContainer: {
        height: 40,
        marginTop: 20
    },
    submitText: {
        color: WHITE,
        textAlign: 'center',
        fontSize: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    wrapperView: {
        height: 100,
        backgroundColor: WHITE,
        marginTop: 0,
      },
      error: {
        color: BRAND_PRIMARY,
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center'
      },
});

export default styles;
