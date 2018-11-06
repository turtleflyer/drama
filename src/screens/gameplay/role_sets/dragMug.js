/* eslint-env browser */
import { ActorsSet, RoleClass, Actor } from '../../../libs/actors_and_roles';
import { placeMugRole } from '../supersets/dropPlaces';

export const dragMug = new ActorsSet();

dragMug.name = 'dragMug';

export const followMouseRole = new RoleClass(Symbol('followMouse')).registerAction(dragMug, {
  action({ target, event: { x, y } }) {
    if (target instanceof Actor) {
      target.setPosition({ x, y: y + target.rectHeight / 2 });
      placeMugRole.fire({
        mug: target,
        // Just to check if mug in the boundary of the place
        gotToPlace: false,
      });
    }
  },
});

export const stopDragRole = new RoleClass(Symbol('stopDrag')).registerAction(dragMug, {
  action({ target }) {
    if (target instanceof Actor) {
      placeMugRole.fire({
        mug: target,
        // After drag is stopped mug has to be placed or fall down
        gotToPlace: true,
      });
    }
  },
});
