/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import followMouse from '../../../role_classes/followMouse';

export const dragMug = new ActorsSet();

export const draggingMug = followMouse.registerAction(dragMug, {
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
