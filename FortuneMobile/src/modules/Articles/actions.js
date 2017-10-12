import {
  FETCH_ARTICLESLIST_REQUESTED,
  FETCH_ARTICLESLIST_SUCCESS,
  FETCH_ARTICLESLIST_FAIL,
  CLEAR_ARTICLES,

  FETCH_GETCUSTOMERBALANCE_REQUESTED,
  FETCH_CUSTOMERBALANCE_SUCCESS,
  FETCH_CUSTOMERBALANCE_FAILED

} from './constants';

export const articlesListRequested = () => ({
  type: FETCH_ARTICLESLIST_REQUESTED,
});

export const articlesListSuccess = data => ({
  type: FETCH_ARTICLESLIST_SUCCESS,
  data,
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

export const getCustomerBalanceSuccess = data => ({
  type: FETCH_CUSTOMERBALANCE_SUCCESS,
  data,
});

export const getCustomerBalanceFailed = error => ({
  type: FETCH_CUSTOMERBALANCE_FAILED,
  error,
});
