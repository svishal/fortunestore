import {
  FETCH_LOGIN_REQUESTED,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAIL,
  CLEAR_LOGIN,
} from './constants';

export const loginRequested = (username, passwordInput) => ({
  type: FETCH_LOGIN_REQUESTED,
  username,
  passwordInput
});

export const loginSuccess = data => ({
  type: FETCH_LOGIN_SUCCESS,
  data,
});

export const loginFailed = error => ({
  type: FETCH_LOGIN_FAIL,
  error,
});

export const clearLogin = () => ({
  type: CLEAR_LOGIN,
});
