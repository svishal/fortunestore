import { combineReducers } from 'redux';
import playerReducer from './modules/Login/reducer';


const rootReducer = combineReducers({
  player: playerReducer,
});

export default rootReducer;