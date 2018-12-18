import { ActorsSet } from '../../../../libs/actors_and_roles';
import { followMouse, stopDrag } from '../../../../stage/role_classes';
import { centerOfGlassPlace } from '../glassPlace/glassPlace';
import { bottleFillParams } from './bottleFill_params';
import stage from '../../../../stage/stage';

export const bottleToFill = new ActorsSet();

bottleToFill.name = 'bottleToFill';

bottleToFill.onAddActorEvent(({ target: bottle }) => {
  bottle.setZIndex(80);
});

export const followMouseRoleBottleToFill = followMouse
  .registerAction(bottleToFill, {
    action({ target: bottle, roleSet, event: { x, y } }) {
      if (roleSet.size > 0) {
        const { x: xp, y: yp } = centerOfGlassPlace;
        if (
          // eslint-disable-next-line
          Math.sqrt((xp - x) ** 2 + (yp - y) ** 2) / stage.scaleF >
          bottleFillParams.distanceToGetBackBottle
        ) {
          bottle.node.style.transform = null;
          bottle.getBackOnTable();
        } else {
          bottle.setPositionXY({ x, y }, true);
          if (y < yp) {
            const {
              start: startRotatePoint,
              end: endRotatePoint,
            } = bottleFillParams.distancesXToRotateBottle;
            const distanceX = (x - xp) / stage.scaleF;
            if (distanceX > startRotatePoint || distanceX < endRotatePoint) {
              bottle.node.style.transform = null;
            } else {
              const angle = 360 - (95 * (startRotatePoint - distanceX)) / (startRotatePoint - endRotatePoint);
              bottle.node.style.transform = `rotate(${angle}deg)`;

              // const m = window.getComputedStyle(bottle.node).getPropertyValue('transform');
              // console.log('m: ', m);
              // const r = m
              //   .replace(/([^\-\d\.]+)/g, ' ')
              //   .replace(/^ (.*) $/, '$1')
              //   .split(' ')
              //   .map(e => Number(e));
              // console.log('r: ', r);
              // console.log('bottle: ', bottle);
              // console.log('bottle.node.style.transform: ', bottle.node.style.transform);
            }
          } else {
            bottle.node.style.transform = null;
          }
        }
      }
    },
  })
  .start();

export const stopDragRoleDraggable = stopDrag
  .registerAction(bottleToFill, {
    action({ target: bottle, roleSet }) {
      if (roleSet.size > 0) {
        bottle.node.style.transform = null;
        bottle.getBackOnTable();
      }
    },
  })
  .start();
