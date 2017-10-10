import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
// import AsyncStorageUtil from '../../utils/asyncStorage';
import { FETCH_PAYMENT_REQUESTED } from './constants';
import { paymentSuccess, paymentFailed } from './actions';
import config from '../../utils/config';

function* fetchPayment({ username, password }) {
  const url = `${config.API_URL}/login`;
  try {
    const paymentData = yield call(axios.post, url, { _username: username, _password: password });
    yield put(paymentSuccess(paymentData.data));
    // Actions.articles();
  } catch (error) {
    yield put(paymentFailed(error));
  }
}

function* sagaPayment() {
  yield takeEvery(FETCH_PAYMENT_REQUESTED, fetchPayment);
}

export default sagaPayment;
