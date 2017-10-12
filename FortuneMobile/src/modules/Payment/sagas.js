import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
// import AsyncStorageUtil from '../../utils/asyncStorage';
import { FETCH_PAYMENT_REQUESTED } from './constants';
import { paymentSuccess, paymentFailed } from './actions';
import config from '../../utils/config';
import { getToken } from '../Login/sagas';

function* fetchPayment({ fosId, customerId, selectedItemsArray, amountToBePaid }) {
  try {
    const url = `${config.API_URL}/customers/${customerId}/expenditures`;
    const token = yield call(getToken);
    const response = yield call(axios, {
      url,
      method: 'POST',
      data: {
        fos_id: fosId,
        order_date: '2017-10-12',
        purchased_items: selectedItemsArray,
        total_amount: amountToBePaid
      },
      headers: { Authorization: token },
    });
    yield put(paymentSuccess(response.data));

  } catch (error) {
    yield put(paymentFailed(error));
  }
}

function* sagaPayment() {
  yield takeEvery(FETCH_PAYMENT_REQUESTED, fetchPayment);
}

export default sagaPayment;
