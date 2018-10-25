/* eslint-env browser */
import followMouse from '../../../../../role_classes/followMouse';
import dragMug from '../dragMug';
import stage from '../../../../../role_sets/stage/stage';

export default followMouse.registerAction(dragMug, {
  action({ target, event: { x, y } }) {
    if (target) {
      // const { scaleF } = stage;
      target.setPosition({ x, y: y + target.rectHeight / 2 });
      // fireEvent(getUnit('DropPlaces'), 'checkEnter', {
      //   mug: target,
      //   tryToPlace: false,
      // });
    }
  },
});
