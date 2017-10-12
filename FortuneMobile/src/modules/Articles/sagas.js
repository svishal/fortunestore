import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorageUtil from '../../utils/asyncStorage';
import { FETCH_ARTICLESLIST_REQUESTED,
         FETCH_GETCUSTOMERBALANCE_REQUESTED,
         FETCH_ADDCUSTOMERBALANCE_REQUESTED } from './constants';
import { articlesListSuccess, articlesListFailed,
          getCustomerBalanceSuccess, getCustomerBalanceFailed }
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
    
    console.log(response.data.data);
    const constant = response.data.data;
    const id = constant.id;
    yield call(AsyncStorageUtil.setItemInStorage, 'customerId', id);
    // const customerData = yield call(AsyncStorageUtil.getItemFromStorage, 'customerId');
  } catch (e) {
    yield put(getCustomerBalanceFailed());
  }
}

function* addMoreMoneyIntoCustomerAccount() {
  const url = `${config.API_URL}/customers/`;
  const token = yield call(getToken);
  try {
    const artistData = yield call(axios.get, url, { headers: { Authorization: token } });
    yield put(articlesListSuccess(artistData.data));
  } catch (e) {
    yield put(articlesListFailed());
  }
}

function* sagaArticles() {
  yield takeEvery(FETCH_ARTICLESLIST_REQUESTED, fetchArticlesList);
  yield takeEvery(FETCH_GETCUSTOMERBALANCE_REQUESTED, fetchCustomerBalance);
  yield takeEvery(FETCH_ADDCUSTOMERBALANCE_REQUESTED, addMoreMoneyIntoCustomerAccount);
}

export default sagaArticles;
