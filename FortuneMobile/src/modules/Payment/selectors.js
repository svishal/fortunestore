import { createSelector } from 'reselect';
import { REDUCER_KEY } from './constants';

const getPaymentData = state => state[REDUCER_KEY].get('paymentData');
const getLoading = state => state[REDUCER_KEY].get('loading');
const getError = state => state[REDUCER_KEY].get('error');

export const getPaymentDataSelector = createSelector(
  getPaymentData,
  paymentData => paymentData
);

export const getLoadingSelector = createSelector(
  getLoading,
  loading => loading
);

export const getErrorSelector = createSelector(
  getError,
  error => error
);
