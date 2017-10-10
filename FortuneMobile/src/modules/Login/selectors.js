import { createSelector } from 'reselect';
import { REDUCER_KEY } from './constants';

const getLoginData = state => state[REDUCER_KEY].get('loginData');
const getLoading = state => state[REDUCER_KEY].get('loading');
const getError = state => state[REDUCER_KEY].get('error');

export const getLoginDataSelector = createSelector(
  getLoginData,
  loginData => loginData
);

export const getLoadingSelector = createSelector(
  getLoading,
  loading => loading
);

export const getErrorSelector = createSelector(
  getError,
  error => error
);
