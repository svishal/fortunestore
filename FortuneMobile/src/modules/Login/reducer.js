import { Map } from 'immutable';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from './constant';

export default function (state = {}, action) {
  switch (action.type) {
      case LOGIN:{
          return {
        ...state,
        loginDetail: [],
        loading: true
          }
      }
    case LOGIN_FAIL: {
      return state.set('loading', true);
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data
      }
    }
    default:
      return state;
  }
}
