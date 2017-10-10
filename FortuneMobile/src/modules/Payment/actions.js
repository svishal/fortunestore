import {
  FETCH_PAYMENT_REQUESTED,
  FETCH_PAYMENT_SUCCESS,
  FETCH_PAYMENT_FAIL,
  CLEAR_PAYMENT,
} from './constants';

export const paymentRequested = (username, password) => ({
  type: FETCH_PAYMENT_REQUESTED,
  username,
  password,
});

export const paymentSuccess = data => ({
type: FETCH_PAYMENT_SUCCESS,
  data,
});

export const paymentFailed = error => ({
  type: FETCH_PAYMENT_FAIL,
  error,
});

export const clearPayment = () => ({
  type: CLEAR_PAYMENT,
});



