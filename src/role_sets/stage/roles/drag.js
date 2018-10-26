/* eslint-env browser */
import mousemove from '../../../role_classes/mousemove';
import stage from '../stage';
import followMouse from '../../../screens/gameplay/role_sets/dragMug/roles/followMouse';

export default mousemove.registerAction(stage, {
  action({ event }) {
    event.preventDefault();
    const { clientX, clientY } = event;

    const { scaleF } = stage;
    followMouse.fire({
      x: (clientX - stage.origin.x) / scaleF,
      y: (clientY - stage.origin.y) / scaleF,
    });
  },
});
