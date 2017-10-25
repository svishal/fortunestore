import {
  FETCH_ARTICLESLIST_REQUESTED,
  FETCH_ARTICLESLIST_SUCCESS,
  FETCH_ARTICLESLIST_FAIL,
  CLEAR_ARTICLES,

  FETCH_GETCUSTOMERBALANCE_REQUESTED,
  FETCH_CUSTOMERBALANCE_SUCCESS,
  FETCH_CUSTOMERBALANCE_FAILED,

  ADDBALANCE_REQUESTED,
  ADDBALANCE_SUCCESS,
  ADDBALANCE_FAIL,

  GET_UPDATEDBALANCE

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

// Add Balance 
export const addBalanceRequested = (customerId, amount) => ({
  type: ADDBALANCE_REQUESTED,
  customerId,
  amount
});

export const addBalanceSuccess = (data) => ({
  type: ADDBALANCE_SUCCESS,
  data,
});

export const addBalanceFailed = error => ({
  type: ADDBALANCE_FAIL,
  error,
});
