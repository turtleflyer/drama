import { ActorsSet, Actor, RoleClass } from '../../../libs/actors_and_roles';
import { dragMug } from '../role_sets/dragMug/dragMug';
import { placeMugRole } from './dropPlaces';
import { pouringMug } from '../role_sets/pouringMug/pouringMug';

// eslint-disable-next-line
export const draggable = new ActorsSet([dragMug, pouringMug]);

draggable.name = 'draggable';

export const followMouseRole = new RoleClass(Symbol('followMouse'))
  .registerAction(draggable, {
    action({ target: mug, event: { x, y } }) {
      if (mug instanceof Actor) {
        mug.setPosition({ x, y: y + mug.rectHeight / 2 });
        placeMugRole.fire({
          mug,
          // Just to check if mug in the boundary of the place
          gotToPlace: false,
        });
      }
    },
  })
  .start();

export const stopDragRole = new RoleClass(Symbol('stopDrag'))
  .registerAction(draggable, {
    action({ target: mug }) {
      if (mug instanceof Actor) {
        placeMugRole.fire({
          mug,
          // After drag is stopped mug has to be placed or fall down
          gotToPlace: true,
        });
      }
    },
  })
  .start();
