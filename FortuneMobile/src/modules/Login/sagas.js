import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccess, loginFail } from './actions';
import { LOGIN } from './constant';
import config from '../../config';

function* login() {
  const url = `${config.API_URL}/login`;
  try {
    const composers = yield call(axios.get, url);
    yield put(loginSuccess(login.data));
  } catch (e) {
    yield put(loginFail());
  }
}

function* sagaLogin() {
  yield takeEvery(LOGIN, login);
}

export default sagaLogin;
