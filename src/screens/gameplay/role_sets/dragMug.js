/* eslint-env browser */
import { ActorsSet, RoleClass, Actor } from '../../../libs/actors_and_roles';
import { followMouse } from '../../../assets/role_classes';
import { dropMug } from '../supersets/dropPlaces';
import { stopBubbling } from '../../../libs/eventswork';

export const dragMug = new ActorsSet();

dragMug.name = 'dragMug';

export const draggingMug = followMouse.registerAction(dragMug, {
  action({ target, event: { x, y } }) {
    if (target instanceof Actor) {
      target.setPosition({ x, y: y + target.rectHeight / 2 });
      dropMug.fire({
        mug: target,
        tryToPlace: false,
      });
    }
  },
});

export const stopDrag = new RoleClass(Symbol('stopDrag')).registerAction(dragMug, {
  action({ target, event }) {
    stopBubbling(event);
    if (target) {
      dropMug.fire({
        mug: target,
        tryToPlace: true,
      });
    }
  },
});
