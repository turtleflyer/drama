/* eslint-env browser */
import { ActorsSet, RoleClass } from '../../../libs/actors_and_roles';
import { mugPlaces } from '../role_sets/mugPlaces';
import { hookPlace } from '../role_sets/hookPlace';
import { percentOverlap, updateStyle } from '../../../libs/helpers_lib';
import { fallenMug } from '../role_sets/fallenMug';
import { dragMug } from '../role_sets/dragMug';
import { fillingMugs } from '../role_sets/fillingMugs';
import { waitingMugs } from '../role_sets/waitingMugs';

const signalElement = Symbol('@@dropPlaces/signalElement');
const signalSet = new ActorsSet();
signalSet.getInitializer(function () {
  this.addElement(signalElement);
});

export const dropPlaces = new ActorsSet([mugPlaces, hookPlace, signalSet]);

dropPlaces.name = 'dropPlaces';

export const placeMugRole = new RoleClass(Symbol('placeMug'))
  .registerAction(dropPlaces, {
    action({ target: place, roleSet, event: { mug, gotToPlace } }) {
      if (gotToPlace) {
        // Check if the mug was tested to be placed in all the possible places
        if (place === signalElement) {
          if (!mug.placed) {
            fallenMug.addElement(mug);
          }
        } else {
          const placeRect = place.node.getBoundingClientRect();
          const mugRect = mug.getBoundingRect();
          if (percentOverlap(placeRect, mugRect) > 0.75) {
            switch (roleSet) {
              case mugPlaces:
                {
                  const { faucet } = place;
                  if (!faucet.state.placedMug) {
                    mug.fillingState.faucet = faucet;
                    faucet.state.placedMug = mug;
                    mug.placed = true;
                    mug.setPosition(place.whereToPlaceMug());
                    fillingMugs.addElement(mug);
                  }
                }
                break;

              case hookPlace:
                mug.setPosition({ y: place.mugsLine() });
                mug.placed = true;
                waitingMugs.addElement(mug);
                break;

              default:
                break;
            }
          }
        }

        // Block existing only for the time of developing
      } else if (place !== signalElement) {
        const placeRect = place.node.getBoundingClientRect();
        const mugRect = mug.img.getBoundingClientRect();
        if (percentOverlap(placeRect, mugRect) > 0.75) {
          updateStyle(place.node, { 'background-color': 'rgba(255, 0, 0, 0.2)' });
        } else {
          updateStyle(place.node, { 'background-color': 'rgba(255, 255, 255, 0.2)' });
        }
      }
    },
  })
  .start();
