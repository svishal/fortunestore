import { Map } from 'immutable';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './constant';


const initialState = Map({
  loginDetail: [],
  loading: false,
});

export default function (state = initialState, action) {
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