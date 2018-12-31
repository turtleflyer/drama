import { ActorsSet } from '../../../libs/actors_and_roles';
import { onResize } from '../../../stage/role_classes';

export const setA = new ActorsSet();

setA.name = 'setA';

export const resizeEverythingRole = onResize
  .registerAction(setA, {
    action({ target, event: { scaleF } }) {
      if (target.node) {
        // console.log('target: ', target);
        target.refreshScaleF(scaleF);
      }
    },
  })
  .start();
