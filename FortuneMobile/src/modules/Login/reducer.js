import { Map } from 'immutable';
import {
  FETCH_LOGIN_REQUESTED,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAIL,
  CLEAR_LOGIN,
} from './constants';

const initialState = Map({
  loginData: {},
  loading: false,
  error: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LOGIN_REQUESTED: {
      return state.set('loading', true);
    }
    case FETCH_LOGIN_SUCCESS: {
      console.log(action.data);
      
      return state.set('loginData', Object.assign({}, action.data))
        .set('loading', false).set('error', null);
    }
    case FETCH_LOGIN_FAIL: {
      console.log(`Reducer error ${action.error}`);
      return state.set('error', 'Error while login').set('loading', false).set('error', null);
    }
    case CLEAR_LOGIN: {
      return initialState;
    }
    default:
      return state;
  }
}
