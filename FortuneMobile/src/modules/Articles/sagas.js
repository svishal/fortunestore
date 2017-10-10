import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_ARTICLESLIST_REQUESTED,
         FETCH_GETCUSTOMERBALANCE_REQUESTED,
         FETCH_ADDCUSTOMERBALANCE_REQUESTED } from './constants';
import { articlesListSuccess, articlesListFailed } from './actions';
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

function* fetchCustomerBalance() {
  const url = `${config.API_URL}/get_customer_balance`;
  const token = yield call(getToken);
  try {
    const artistData = yield call(axios.get, url, { headers: { Authorization: token } });
    yield put(articlesListSuccess(artistData.data));
  } catch (e) {
    yield put(articlesListFailed());
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
