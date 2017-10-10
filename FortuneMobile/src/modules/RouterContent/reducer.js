import { Map } from 'immutable';
import {
  SCENE_UPDATE,
} from './constants';

const initialState = Map({
  sceneName: 'login',
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SCENE_UPDATE: {
      return state.set('sceneName', action.sceneName);
    }
    default: {
      return state;
    }
  }
}