import { createSelector } from 'reselect';
import { REDUCER_KEY } from './constants';

const getSceneName = state => state[REDUCER_KEY].get('sceneName');

export const getSceneNameSelector = createSelector(
  getSceneName,
  sceneName => sceneName
);
