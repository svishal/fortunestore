import { Map } from 'immutable';
import {
  FETCH_PAYMENT_REQUESTED,
  FETCH_PAYMENT_SUCCESS,
  FETCH_PAYMENT_FAIL,
  CLEAR_PAYMENT,
  CLEAR_ADDMESSAGE,

} from './constants';

const initialState = Map({
  paymentData: {},
  loading: false,
  error: null,
  addMessage: 'init',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PAYMENT_REQUESTED: {
      return state.set('loading', true);
    }
    case FETCH_PAYMENT_SUCCESS: {
      console.log('Payment is done');
      return state.set('paymentData', action.data).set('addMessage', 'success')
        .set('loading', false).set('error', null);
    }
    case FETCH_PAYMENT_FAIL: {
      console.log(`Error while paying -- ${action.error}`);
      return state.set('error', 'Oops payment failed').set('addMessage', 'failure').set('loading', false);
    }
    case CLEAR_PAYMENT: {
      return initialState;
    }
    case CLEAR_ADDMESSAGE: {
      return state.set('addMessage', 'init');
    }
    default:
      return state;
  }
}

