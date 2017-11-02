import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Alert } from 'react-native';
// import AsyncStorageUtil from '../../utils/asyncStorage';
import { FETCH_ARTICLESLIST_REQUESTED,
         FETCH_GETCUSTOMERBALANCE_REQUESTED,
         FETCH_ADDCUSTOMERBALANCE_REQUESTED, FETCH_PAYMENT_REQUESTED } from './constants';
import { articlesListSuccess, articlesListFailed,
          getCustomerBalanceSuccess, getCustomerBalanceFailed, paymentSuccess, paymentFailed }
            from './actions';
import config from '../../utils/config';
import { getToken } from '../Login/sagas';

function* fetchArticlesList() {
  const url = `${config.API_URL}/product_list`;
  const token = yield call(getToken);
  try {
    const artistData = yield call(axios.get, url, { headers: { Authorization: token } });
    yield put(articlesListSuccess(artistData.data));
  } catch (e) {
    yield put(articlesListFailed());
  }
}

function* fetchCustomerBalance({ customerMobileNumber }) { 
  const url = `${config.API_URL}/get_customer_balance`;
  const token = yield call(getToken);
  try {
    const response = yield call(axios, {
      url,
      method: 'POST',
      data: {
        mobile_number: customerMobileNumber
      },
      headers: { Authorization: token },
    });
    yield put(getCustomerBalanceSuccess(response.data));
  } catch (e) {
    yield put(getCustomerBalanceFailed(e));
  }
}

function* expenditure({ fosId, customerId, payAmount }) {
  try {
    const url = `${config.API_URL}/customers/${customerId}/expenditures`;
    const token = yield call(getToken);
    const today = new Date();
    console.log(today);
    const response = yield call(axios, {
      url,
      method: 'POST',
      data: {
        fos_id: fosId,
        order_date: '2017-10-12',
        total_amount: payAmount
      },
      headers: { Authorization: token },
    });
    yield put(paymentSuccess(response.data));
  } catch (error) {
    yield put(paymentFailed(error));
  }
}

function* addMoreMoneyIntoCustomerAccount() {
  const url = `${config.API_URL}/customers/`;
  const token = yield call(getToken);
  try {
    const artistData = yield call(axios.get, url, { headers: { Authorization: token } });
    yield put(articlesListSuccess(artistData.data));
  } catch (e) {
    yield put(articlesListFailed(e));
  }
}

function* sagaArticles() {
  yield takeEvery(FETCH_ARTICLESLIST_REQUESTED, fetchArticlesList);
  yield takeEvery(FETCH_GETCUSTOMERBALANCE_REQUESTED, fetchCustomerBalance);
  yield takeEvery(FETCH_ADDCUSTOMERBALANCE_REQUESTED, addMoreMoneyIntoCustomerAccount);
  yield takeEvery(FETCH_PAYMENT_REQUESTED, expenditure);
}

export default sagaArticles;
