/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import { followMouse } from '../../../assets/role_classes';
import { dropMug } from '../supersets/dropPlaces';

export const dragMug = new ActorsSet();

export const draggingMug = followMouse.registerAction(dragMug, {
  action({ target, event: { x, y } }) {
    if (target) {
      target.setPosition({ x, y: y + target.rectHeight / 2 });
      dropMug.fire({
        mug: target,
        tryToPlace: false,
      });
    }
  },
});
