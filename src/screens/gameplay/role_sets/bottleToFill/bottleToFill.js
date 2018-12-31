/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';
import { followMouse, stopDrag, onPulseTick } from '../../../../stage/role_classes';
import { bottleFillParams } from './bottleFill_params';
import { glassPlace } from '../glassPlace/glassPlace';
import { fillingGlass } from '../fillingGlass/fillingGlass';
import stage from '../../../../stage/stage';
import { whiskeyGlassParams } from '../mugs/mugs_params';
import { startStopRoles } from '../../../../roles_manipulators';

export const bottleToFill = new ActorsSet();

bottleToFill.name = 'bottleToFill';

bottleToFill.onAddActorEvent(({ target: bottle }) => {
  bottle.setZIndex(80);
});

export const followMouseRoleBottleToFill = followMouse
  .registerAction(bottleToFill, {
    action({
      target: bottle,
      target: { node: bottleNode, state: stateOfBottle },
      roleSet,
      event: { x, y },
    }) {
      if (roleSet.size > 0) {
        const { x: xp, y: yp } = glassPlace.centerOfGlassPlace;
        if (
          // eslint-disable-next-line
          Math.sqrt((xp - x) ** 2 + (yp - y) ** 2) > bottleFillParams.distanceToGetBackBottle
        ) {
          bottleNode.style.transform = null;
          bottle.getBackOnTable();
        } else {
          bottle.setPositionXY({ x, y }, true);
          if (fillingGlass.size > 0) {
            const [glass] = [...fillingGlass];

            const {
              state: { filled: isGlassFilled },
            } = glass;

            if (isGlassFilled || y > yp - 5) {
              bottleNode.style.transform = null;
              bottle.detachJet();
              glass.backOnTable();
            } else {
              const { fillingStartPoint } = stateOfBottle;
              if (
                fillingStartPoint
                && Math.abs(x - fillingStartPoint) < bottleFillParams.shiftAllowanceWhileFilling
              ) {
                bottle.attachJet(yp - y);
                glass.elevateToBeFilled();
              } else {
                const {
                  start: startRotatePoint,
                  end: endRotatePoint,
                } = bottleFillParams.distancesXToRotateBottle;

                const distanceX = x - xp;

                if (distanceX > startRotatePoint || distanceX < endRotatePoint) {
                  bottleNode.style.transform = null;
                  bottle.detachJet();
                  glass.backOnTable();
                } else {
                  const angle = 360
                    - (bottleFillParams.maxPitch * (startRotatePoint - distanceX))
                      / (startRotatePoint - endRotatePoint);

                  bottleNode.style.transform = `rotate(${angle}deg)`;

                  if (angle <= 360 - bottleFillParams.pitchWhenFlow) {
                    bottle.attachJet(yp - y, angle);
                    stateOfBottle.fillingStartPoint = x;
                    stateOfBottle.fillingStartTime = performance.now();
                  } else {
                    bottle.detachJet();
                    glass.backOnTable();
                  }
                }
              }
            }
          }
        }
      }
    },
  })
  .start();

export const stopDragRoleDraggable = stopDrag
  .registerAction(bottleToFill, {
    action({ target: bottle, target: { node: bottleNode }, roleSet }) {
      if (roleSet.size > 0) {
        bottleNode.style.transform = null;
        bottle.getBackOnTable();
      }
    },
  })
  .start();

export const watchFillingRole = onPulseTick.registerAction(bottleToFill, {
  action({ target: bottle, roleSet }) {
    if (roleSet.size > 0 && fillingGlass.size > 0) {
      const {
        state: { fillingStartTime },
      } = bottle;
      if (fillingStartTime) {
        const [glass] = [...fillingGlass];
        const { state: stateOfGlass } = glass;
        if (performance.now() - fillingStartTime >= whiskeyGlassParams.volume * 1000) {
          stateOfGlass.filled = true;
          glass.showToBeFilled();
          bottle.node.style.transform = null;
          bottle.detachJet();
          glass.backOnTable();
          stage.state.money -= whiskeyGlassParams.costOfFilledGlass;
        }
      }
    }
  },
});

startStopRoles.addElement(watchFillingRole);
