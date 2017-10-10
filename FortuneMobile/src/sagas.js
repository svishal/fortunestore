import { fork } from 'redux-saga/effects';
import sagaLogin from './modules/Login/sagas';
import sagaArticles from './modules/Articles/sagas';
import sagaPayment from './modules/Payment/sagas';

function* rootSaga() {
  yield [
    fork(sagaLogin),
    fork(sagaArticles),
    fork(sagaPayment)
  ];
}

export default rootSaga;
