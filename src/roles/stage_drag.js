/* eslint-env browser */
import mousemove from '../role_classes/mousemove';
import stage from '../role_sets/stage';
import dragMugFollowMouse from './dragMug_followMouse';

export default mousemove.registerAction(stage, {
  action({ event }) {
    event.preventDefault();
    const { clientX, clientY } = event;

    const { scaleF } = stage;
    dragMugFollowMouse.fireItself({
      x: (clientX - stage.origin.x) / scaleF,
      y: (clientY - stage.origin.y) / scaleF,
    });
  },
});
