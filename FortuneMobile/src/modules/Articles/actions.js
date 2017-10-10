import {
  FETCH_ARTICLESLIST_REQUESTED,
  FETCH_ARTICLESLIST_SUCCESS,
  FETCH_ARTICLESLIST_FAIL,
  CLEAR_ARTICLES,
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
