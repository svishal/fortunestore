import { Map } from 'immutable';
import {
  FETCH_ARTICLESLIST_REQUESTED,
  FETCH_ARTICLESLIST_SUCCESS,
  FETCH_ARTICLESLIST_FAIL,
  CLEAR_ARTICLES,
  FETCH_GETCUSTOMERBALANCE_REQUESTED,
  FETCH_CUSTOMERBALANCE_SUCCESS,
  FETCH_CUSTOMERBALANCE_FAILED
} from './constants';

const initialState = Map({
  articlesData: [],
  customerBalance: '',
  loading: false,
  error: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLESLIST_REQUESTED: {
      return state.set('loading', true);
    }
    case FETCH_ARTICLESLIST_SUCCESS: {
      console.log(`Articles data is --- ${action.data.data}`);
      return state.set('articlesData', action.data.data)
      .set('loading', false).set('error', null);
    }
    
    case FETCH_ARTICLESLIST_FAIL: {
      console.log(`Damn you failed  --- ${action.error.response.data.message}`);
      return state.set('error', action.error.response.data.message);
    }
    case CLEAR_ARTICLES: {
      return initialState;
    }

    case FETCH_GETCUSTOMERBALANCE_REQUESTED: {
      return state.set('loading', true);
    }
    case FETCH_CUSTOMERBALANCE_SUCCESS: {
      console.log(`Articles data is --- ${action.data.data}`);
      return state.set('customerBalance', action.data)
      .set('loading', false).set('error', null);
    }
    case FETCH_CUSTOMERBALANCE_FAILED: {
      console.log(`Damn you failed  --- ${action.error.response.data.message}`);
      return state.set('error', action.error.response.data.message);
    }

    default:
      return state;
  }
}
