/* eslint-env browser */
import { ActorsSet, RoleClass } from '../../../libs/actors_and_roles';
import { percentOverlap, updateStyle } from '../../../libs/helpers_lib';
import { fallenMug } from '../role_sets/fallenMug/fallenMug';
import { pourOutArea } from '../role_sets/pourOutArea/pourOutArea';
import { fillingMugs } from '../role_sets/fillingMugs/fillingMugs';
import { hookPlace } from '../role_sets/hookPlace/hookPlace';
import { mugPlaces } from '../role_sets/mugPlaces/mugPlaces';
import { waitingMugs } from '../role_sets/waitingMugs/waitingMugs';
import { pouringMug } from '../role_sets/pouringMug/pouringMug';

const signalSet = new ActorsSet();

signalSet.name = 'signalSet';

export const dropPlaces = new ActorsSet([hookPlace, mugPlaces, pourOutArea, signalSet]);

dropPlaces.name = 'dropPlaces';

export const placeMugRole = new RoleClass(Symbol('placeMug'))
  .registerAction(dropPlaces, {
    action({ target: place, roleSet, event: { mug, gotToPlace } }) {
      const placeRect = place.node && place.node.getBoundingClientRect();
      const mugRect = mug.getBoundingRect();
      const {
        state: { placed: isPlaced, pouring },
      } = mug;

      if (gotToPlace) {
        // Check if the mug was tested to be placed in all the possible places
        if (roleSet === signalSet) {
          if (!isPlaced) {
            fallenMug.addElement(mug);
          }
        } else if (percentOverlap(placeRect, mugRect) > 0.75) {
          switch (roleSet) {
            case mugPlaces:
              {
                const { faucet } = place;
                if (!faucet.state.placedMug) {
                  faucet.placeMug(mug);
                  mug.placedToBeFilled(faucet);
                  mug.setPositionXY(place.whereToPlaceMug());
                  fillingMugs.addElement(mug);
                }
              }
              break;

            case hookPlace:
              mug.setPositionXY({ y: place.mugsLine() });
              waitingMugs.addElement(mug);
              break;

            default:
              break;
          }
        }
      } else if (
        roleSet === pourOutArea
        && !pouring
        && mug.state.total
        && percentOverlap(placeRect, mugRect) > 0.75
      ) {
        pouringMug.addElement(mug);
      }

      // Block existing only for the time of developing
      if (roleSet !== signalSet) {
        if (percentOverlap(placeRect, mugRect) > 0.75) {
          updateStyle(place.node, { 'background-color': 'rgba(255, 0, 0, 0.2)' });
        } else {
          updateStyle(place.node, { 'background-color': 'rgba(255, 255, 255, 0.2)' });
        }
      }
    },
  })
  .start();
