import { Map } from 'immutable';
import {
  FETCH_PAYMENT_REQUESTED,
  FETCH_PAYMENT_SUCCESS,
  FETCH_PAYMENT_FAIL,
  CLEAR_PAYMENT,
} from './constants';

const initialState = Map({
  paymentData: {},
  loading: false,
  error: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PAYMENT_REQUESTED: {
      return state.set('loading', true);
    }
    case FETCH_PAYMENT_SUCCESS: {
      return state.set('paymentData', action.data)
        .set('loading', false).set('error', null);
    }
    case FETCH_PAYMENT_FAIL: {
      return state.set('error', action.error.response.data.message);
    }
    case CLEAR_PAYMENT: {
      return initialState;
    }
    default:
      return state;
  }
}




