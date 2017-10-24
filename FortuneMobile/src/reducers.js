import { combineReducers } from 'redux';
import loginReducer from './modules/Login/reducer';
import articlesReducer from './modules/Articles/reducer';
import paymentReducer from './modules/Payment/reducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  payment: paymentReducer,
  login: loginReducer
});

export default rootReducer;
