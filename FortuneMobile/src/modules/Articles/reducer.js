import { Map } from 'immutable';
import { Alert } from 'react-native';
import {
  FETCH_ARTICLESLIST_REQUESTED,
  FETCH_ARTICLESLIST_SUCCESS,
  FETCH_ARTICLESLIST_FAIL,
  CLEAR_ARTICLES,
  FETCH_GETCUSTOMERBALANCE_REQUESTED,
  FETCH_CUSTOMERBALANCE_SUCCESS,
  FETCH_CUSTOMERBALANCE_FAILED,

  GET_UPDATEDBALANCE,
  FETCH_PAYMENT_REQUESTED,
  FETCH_PAYMENT_SUCCESS,
  FETCH_PAYMENT_FAIL,
} from './constants';

const initialState = Map({
  articlesData: [],
  balanceData: [],
  balance: '',
  loading: false,
  error: null,
  customerMobileNumber: '',
  paymentData: {},
  isSuccess: false
});

export default function (state = initialState, action) {
  let articleArray = [];
  let balObject = [];
  switch (action.type) {
    case FETCH_ARTICLESLIST_REQUESTED: {
      return state.set('loading', true).set('balanceData', balObject);
    }
    case FETCH_ARTICLESLIST_SUCCESS: {
      console.log(`Articles data is --- ${action.data.message}`);
      articleArray = action.data.data;
      return state.set('articlesData', articleArray)
      .set('loading', false).set('error', null);
    }
    case FETCH_ARTICLESLIST_FAIL: {
      // console.log(`Damn you failed  --- ${action.error.response.data.message}`);
      return state.set('error', 'Error while fetching articles list');
    }
    case CLEAR_ARTICLES: {
      console.log(`Balance data in reducer  --- ${balObject}`);
      return state.set('balanceData', balObject);
    }

    // Balance 
    case FETCH_GETCUSTOMERBALANCE_REQUESTED: {
      return state.set('loading', true);
    }
    case FETCH_CUSTOMERBALANCE_SUCCESS: {
      balObject = action.data.data;
      return state.set('balanceData', balObject)
      .set('loading', false).set('error', null);
    }
    case FETCH_CUSTOMERBALANCE_FAILED: {
       const message = action.error.response.data.message;
       Alert.alert(
        'Oops!',
        message,
        [
          { text: 'OK', onPress: () => console.log('Error') }
        ],
      );
      return state.set('error', message).set('loading', false);
    }

    case GET_UPDATEDBALANCE: {
      return state.set('balanceData', action.data.data)
      .set('loading', false).set('error', null);
    }

    case FETCH_PAYMENT_REQUESTED: {
      return state.set('loading', true);
    }
    case FETCH_PAYMENT_SUCCESS: {
      console.log('Payment is done');
      Alert.alert(
        'Nice!',
        'Your payment has been successfully recieved. Thanks! ',
        [
          { text: 'OK', onPress: () => console.log() }
        ],
      );
      return state.set('paymentData', action.data).set('addMessage', 'success')
        .set('loading', false).set('error', null)
        .set('isSuccess', true);
    }
    case FETCH_PAYMENT_FAIL: {
      return state.set('error', 'Oops payment failed').set('addMessage', 'failure').set('loading', false).set('isSuccess', false);
    }

    default:
      return state;
  }
}
