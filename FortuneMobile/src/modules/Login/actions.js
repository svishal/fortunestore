import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './constant';

export function login(input) {
  return {
    type: LOGIN,
    username: username
  }
}

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  data,
});

export const loginFail = () => ({
  type: LOGIN_FAIL,
  message: 'Something went wrong',
});
