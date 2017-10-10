import { createSelector } from 'reselect';
import { REDUCER_KEY } from './constants';

const getArticlesData = state => state[REDUCER_KEY].get('articlesData');
const getLoading = state => state[REDUCER_KEY].get('loading');
const getError = state => state[REDUCER_KEY].get('error');

export const getArticlesDataSelector = createSelector(
  getArticlesData,
  ArticlesData => ArticlesData
);

export const getLoadingSelector = createSelector(
  getLoading,
  loading => loading
);

export const getErrorSelector = createSelector(
  getError,
  error => error
);
