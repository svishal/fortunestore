import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_ARTICLESLIST_REQUESTED } from './constants';
import { articlesListSuccess, articlesListFailed } from './actions';
import config from '../../utils/config';
import { getToken } from '../Login/sagas';
 
// function* fetchArticles() {
//   const url = `${config.API_URL}/product_list`;
//   try {

//     const token = yield call(getToken);
//     const articlesData = yield call(axios.get, url, { : token });
//     yield put(articlesSuccess(articlesData.data));
//     // Actions.articles();
//   } catch (error) {
//     yield put(articlesFailed(error));
//   }
// }

function* fetchArticlesList() {
  const url = `${config.API_URL}/product_list`;
  console.log(`Code executed ${token}`);
  const token = yield call(getToken);
  try {
    const artistData = yield call(axios.get, url, { headers: { Authorization: token } });
    yield put(articlesListSuccess(artistData.data.data));
  } catch (e) {
    yield put(articlesListFailed());
  }
}

function* sagaArticles() {
  yield takeEvery(FETCH_ARTICLESLIST_REQUESTED, fetchArticlesList);
}

export default sagaArticles;
