import { ActorsSet, Actor } from '../../../libs/actors_and_roles';
import { dragMug } from '../role_sets/dragMug/dragMug';
import { placeMugRole } from './dropPlaces';
import { pouringMug } from '../role_sets/pouringMug/pouringMug';
import { bottleToFill } from '../role_sets/bottleToFill/bottleToFill';
import { stopDrag, followMouse } from '../../../stage/role_classes';

export const draggable = new ActorsSet([dragMug, pouringMug, bottleToFill]);

draggable.name = 'draggable';

export const followMouseRoleDraggable = followMouse
  .registerAction(draggable, {
    action({ target, event: { x, y } }) {
      if (target instanceof Actor) {
        target.setPositionXY({ x, y }, true);
        placeMugRole.fire({
          mug: target,
          // Just to check if mug in the boundary of the place
          gotToPlace: false,
        });
      }
    },
  })
  .start();

export const stopDragRoleDraggable = stopDrag
  .registerAction(draggable, {
    action({ target }) {
      if (target instanceof Actor) {
        placeMugRole.fire({
          mug: target,
          // After drag is stopped mug has to be placed or fall down
          gotToPlace: true,
        });
      }
    },
  })
  .start();
