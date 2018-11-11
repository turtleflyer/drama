/* eslint-env browser */
import { ActorsSet, RoleClass } from '../../../libs/actors_and_roles';
import { mugPlaces } from '../role_sets/mugPlaces';
import { hookPlace } from '../role_sets/hookPlace';
import { percentOverlap, updateStyle } from '../../../libs/helpers_lib';
import { fallenMug } from '../role_sets/fallenMug';
import { dragMug } from '../role_sets/dragMug';
import { fillingMugs } from '../role_sets/fillingMugs';

const signalElement = Symbol('@@dropPlaces/signalElement');
const signalSet = new ActorsSet();
signalSet.getInitializer(function () {
  this.addElement(signalElement);
});

export const dropPlaces = new ActorsSet([mugPlaces, hookPlace, signalSet]);

dropPlaces.name = 'dropPlaces';

export const placeMugRole = new RoleClass(Symbol('placeMug')).registerAction(dropPlaces, {
  action({ target, roleSet, event: { mug, gotToPlace } }) {
    if (gotToPlace) {
      if (target === signalElement) {
        if (!mug.placed) {
          fallenMug.addElement(mug);
        }
      } else {
        const placeRect = target.node.getBoundingClientRect();
        const mugRect = mug.getBoundingRect();
        if (percentOverlap(placeRect, mugRect) > 0.75) {
          switch (roleSet) {
            case mugPlaces:
              {
                const { faucet } = target;
                if (!faucet.placedMug) {
                  // const MugFilling = getUnit('MugFilling');
                  // MugFilling.addElement(mug);
                  mug.fillingState.faucet = target.faucet;
                  faucet.placedMug = mug;
                  mug.placed = true;
                  mug.setPosition(target.position);
                  fillingMugs.addElement(mug);
                }
              }
              break;

            case hookPlace:
              // const MugWaiting = getUnit('MugWaiting');
              // MugWaiting.addElement(mug);
              mug.setPosition({ y: target.mugsLine() });
              mug.placed = true;
              dragMug.deleteElement(mug);
              break;

            default:
              break;
          }
        }
      }

      // Block existing only for the time of developing
    } else if (target !== signalElement) {
      const placeRect = target.node.getBoundingClientRect();
      const mugRect = mug.img.getBoundingClientRect();
      if (percentOverlap(placeRect, mugRect) > 0.75) {
        updateStyle(target.node, { 'background-color': 'rgba(255, 0, 0, 0.2)' });
      } else {
        updateStyle(target.node, { 'background-color': 'rgba(255, 255, 255, 0.2)' });
      }
    }
  },
}).start();
