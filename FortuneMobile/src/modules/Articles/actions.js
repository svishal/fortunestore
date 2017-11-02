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

export const articlesListRequested = () => ({
  type: FETCH_ARTICLESLIST_REQUESTED,
});

export const articlesListSuccess = (data, customerMobileNumber) => ({
  type: FETCH_ARTICLESLIST_SUCCESS,
  data,
  customerMobileNumber
});

export const articlesListFailed = error => ({
  type: FETCH_ARTICLESLIST_FAIL,
  error,
});

export const clearArticles = () => ({
  type: CLEAR_ARTICLES,
});

// Customer Balance 
export const getCustomerBalanceRequested = (customerMobileNumber) => ({
  type: FETCH_GETCUSTOMERBALANCE_REQUESTED,
  customerMobileNumber
});

export const getCustomerBalanceSuccess = (data, customerMobileNumber) => ({
  type: FETCH_CUSTOMERBALANCE_SUCCESS,
  data,
  customerMobileNumber
});

export const getCustomerBalanceFailed = error => ({
  type: FETCH_CUSTOMERBALANCE_FAILED,
  error,
});

export const getUpdatedBalance = (balance) => ({
  type: GET_UPDATEDBALANCE,
  balance
});

// Expenditure
export const paymentRequested = (fosId, customerId, payAmount) => ({
  type: FETCH_PAYMENT_REQUESTED,
  fosId,
  customerId,
  payAmount
});

export const paymentSuccess = data => ({
type: FETCH_PAYMENT_SUCCESS,
  data,
});
                                                                 
export const paymentFailed = error => ({
  type: FETCH_PAYMENT_FAIL,
  error,
});
