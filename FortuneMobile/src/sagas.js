import { fork } from 'redux-saga/effects';
import sagaLogin from './modules/Login/sagas';

function* rootSaga() {
  yield [
    fork(sagaLogin),
  ];
}

export default rootSaga;
