import { Map } from 'immutable';
import {
  FETCH_ARTICLESLIST_REQUESTED,
  FETCH_ARTICLESLIST_SUCCESS,
  FETCH_ARTICLESLIST_FAIL,
  CLEAR_ARTICLES,
  FETCH_GETCUSTOMERBALANCE_REQUESTED,
  FETCH_CUSTOMERBALANCE_SUCCESS,
  FETCH_CUSTOMERBALANCE_FAILED,
  ADDBALANCE_REQUESTED,
  ADDBALANCE_SUCCESS,
  ADDBALANCE_FAIL,
  GET_UPDATEDBALANCE
} from './constants';

const initialState = Map({
  articlesData: [],
  balanceData: {},
  balance: '',
  loading: false,
  error: null,
  customerMobileNumber: ''
  
});

export default function (state = initialState, action) {
  let articleArray = [];
  const balObject = { current_balance : '' };
  switch (action.type) {
    case FETCH_ARTICLESLIST_REQUESTED: {
      return state.set('loading', true).set('balanceData', balObject);
    }
    case FETCH_ARTICLESLIST_SUCCESS: {
      console.log(`Articles data is --- ${action.data.message}`);
      articleArray = action.data.data;
      return state.set('articlesData', articleArray)
      .set('loading', false).set('error', null);
    }
    case FETCH_ARTICLESLIST_FAIL: {
      // console.log(`Damn you failed  --- ${action.error.response.data.message}`);
      return state.set('error', 'Error while fetching articles list');
    }
    case CLEAR_ARTICLES: {
      console.log(`Balance data in reducer  --- ${balObject}`);
      return state.set('balanceData', balObject);
    }

    // Balance 
    case FETCH_GETCUSTOMERBALANCE_REQUESTED: {
      return state.set('loading', true);
    }
    case FETCH_CUSTOMERBALANCE_SUCCESS: {
      const bal = action.data.data.current_balance;
      return state.set('balanceData', action.data.data).set('balance', bal)
      .set('loading', false).set('error', null);
    }
    case FETCH_CUSTOMERBALANCE_FAILED: {
      // console.log(`Damn you failed  --- ${action.error.response.data.message}`);
      return state.set('error', 'Error while fetching customer balance').set('loading', false);
    }

    case GET_UPDATEDBALANCE: {
      return state.set('balanceData', action.data.data)
      .set('loading', false).set('error', null);
    }

    // Add balance 
    case ADDBALANCE_REQUESTED: {
      return state.set('loading', true);
    }
    case ADDBALANCE_SUCCESS: {
      const bal = action.data.data.current_balance;
      return state.set('balanceData', action.data.data).set('balance', bal)
      .set('loading', false).set('error', null);
    }
    case ADDBALANCE_FAIL: {
      console.log(`Damn you failed  --- ${'Error while fetching customer balance'}`);
      return state.set('error', 'Error while fetching customer balance').set('loading', false);
    }
    default:
      return state;
  }
}
