import { createSelector } from 'reselect';
import { REDUCER_KEY } from './constants';

const getArticlesData = state => state[REDUCER_KEY].get('articlesData');
const getCustomerBalanceData = state => state[REDUCER_KEY].get('balanceData');
const getLoading = state => state[REDUCER_KEY].get('loading');
const getError = state => state[REDUCER_KEY].get('error');

export const getArticlesDataSelector = createSelector(
  getArticlesData,
  articlesData => articlesData
);

export const getCustomerBalanceSelector = createSelector(
  getCustomerBalanceData,
  balanceData => balanceData
);

export const getLoadingSelector = createSelector(
  getLoading,
  loading => loading
);

export const getErrorSelector = createSelector(
  getError,
  error => error
);

export const getUpdatedBalanceSelector = createSelector(
  getError,
  balanceData => balanceData
);
