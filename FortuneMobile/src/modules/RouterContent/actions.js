import {
  SCENE_UPDATE,
} from './constants';

export const sceneUpdated = sceneName => ({
  type: SCENE_UPDATE,
  sceneName,
});
