import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Platform, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorageUtil from '../../utils/asyncStorage';
import { FETCH_LOGIN_REQUESTED } from './constants';
import { loginSuccess, loginFailed } from './actions';
import config from '../../utils/config';


export function* getToken() {
  const loginData = yield call(AsyncStorageUtil.getItemFromStorage, 'loginData');
  return `Bearer ${loginData.data.access_token}`;
}


function* fetchLogin({ username, passwordInput }) {
  const url = `${config.API_URL}/login`;
  try {
    const id = DeviceInfo.getUniqueID();
    let platformType; 
    if (Platform.OS === 'ios') {
      platformType = 'iphone';
    } else {
      platformType = 'android';
    }
    // const loginDataGet = yield call(AsyncStorageUtil.getItemFromStorage, 'loginData');
    // console.log(`Here is my login data + ${loginDataGet.data.access_token}`);
    console.log(username, passwordInput, platformType, id);
    const loginData = yield call(axios.post, url, { mobile_number: username, password: passwordInput, device_type: platformType, device_id: id });
    yield put(loginSuccess(loginData.data));
    console.log(loginData);
    yield call(AsyncStorageUtil.setItemInStorage, 'loginData', loginData.data);
    const logData = loginData.data.data;
    const fosId = logData.id;
    const addMoney = logData.add_money;
    yield call(AsyncStorageUtil.setItemInStorage, 'fosId', fosId);
    yield call(AsyncStorageUtil.setItemInStorage, 'addMoney', addMoney);
    Actions.articles();
  } catch (error) {
    console.log(`Got error + ${error}`);
    yield put(loginFailed(error));

    Alert.alert(
      'Oops!',
      'Something went wrong, Please contact to admin',
      [
        { text: 'OK', onPress: () => console.log('Error') }
      ],
    );
  }
}

function* sagaLogin() {
  yield takeEvery(FETCH_LOGIN_REQUESTED, fetchLogin);
}

export default sagaLogin;
