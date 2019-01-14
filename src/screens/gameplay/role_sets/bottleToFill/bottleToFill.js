/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';
import { followMouse, stopDrag, onPulseTick } from '../../../../stage/role_classes';
import { bottleFillParams } from './bottleFill_params';
import { fillingGlass } from '../fillingGlass/fillingGlass';
import stage from '../../../../stage/stage';
import { whiskeyGlassParams } from '../mugs/mugs_params';
import { startStopRoles } from '../../../../roles_manipulators';
import { whiskeyBottleParams } from '../whiskeyBottle/whiskeyBottle_params';
import { glassPlaceSet } from '../glassPlace/glassPlace';

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
        const {
          distanceToGetBackBottle,
          bottleYPositionElevationLimit,
          shiftAllowanceWhileFilling,
          distancesXToRotateBottle: { start: startRotatePoint, end: endRotatePoint, stillReady },
          pitchToBeReadyToFlow,
          maxPitch,
          pitchWhenFlowStart,
        } = bottleFillParams;
        const { x: xo, y: yo } = whiskeyBottleParams.position;

        // Check if the bottle is too far from its initial place to be returned on the place
        if (
          // eslint-disable-next-line
          Math.sqrt((xo - x) ** 2 + (yo - y) ** 2) > distanceToGetBackBottle
        ) {
          bottleNode.style.transform = null;
          bottle.getBackOnTable();
        } else {
          const { x: xp, y: yp } = glassPlaceSet.centerXY;
          bottle.setPositionXY({ x, y }, true);

          // Is there the glass being ready to be filled?
          const glass = fillingGlass.size && [...fillingGlass][0];
          if (glass && !glass.state.filled) {
            const { pointWhereFillingStarts } = stateOfBottle;
            const distanceX = x - xp;

            // Check if filling is active.
            if (stateOfBottle.fillingStartTime) {
              // Check if the bottle position too low
              // or too far for filling to be continue or start.
              // Then filling stops.
              if (
                y > yp - bottleYPositionElevationLimit
                || Math.abs(x - pointWhereFillingStarts) > shiftAllowanceWhileFilling
              ) {
                bottle.stopFilling();
                glass.backOnTable();

                // Updating the jet length
              } else {
                bottle.attachJet(yp - y);
              }
            }

            // Check if filling is not active (it can be changed in the pervious block)
            // and the bottle is at sufficient height
            if (!stateOfBottle.fillingStartTime && y < yp - bottleYPositionElevationLimit) {
              // Check if the bottle is outside the boundaries where it is leaning over the glass
              if (distanceX > startRotatePoint || distanceX < endRotatePoint) {
                // Check if the bottle is in the distance where it leans at the angle defined
                // in the parameters
                if (distanceX < endRotatePoint && distanceX > stillReady) {
                  bottleNode.style.transform = `rotate(${360 - pitchToBeReadyToFlow}deg)`;
                } else {
                  bottleNode.style.transform = null;
                }
              } else {
                // prettier-ignore
                const angle = 360 - (maxPitch * (startRotatePoint - distanceX))
                  / (startRotatePoint - endRotatePoint);

                bottleNode.style.transform = `rotate(${angle}deg)`;

                // Check if it is time to start filling
                if (angle <= 360 - pitchWhenFlowStart) {
                  bottle.startFilling();
                  stateOfBottle.pointWhereFillingStarts = x;
                  bottle.attachJet(yp - y, angle);
                  glass.elevateToBeFilled();
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
          bottle.stopFilling();
          glass.showToBeFilled();
          glass.backOnTable();
          stage.state.money -= whiskeyGlassParams.costOfFilledGlass;
        }
      }
    }
  },
});

startStopRoles.addElement(watchFillingRole);
