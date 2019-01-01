/* eslint-env browser */
import { ActorsSet, RoleClass } from '../../../libs/actors_and_roles';
import { percentOverlap, updateStyle } from '../../../libs/helpers_lib';
import { pourOutArea } from '../role_sets/pourOutArea/pourOutArea';
import { hookPlace } from '../role_sets/hookPlace/hookPlace';
import { mugPlaces } from '../role_sets/mugPlaces/mugPlaces';
import { pouringMug } from '../role_sets/pouringMug/pouringMug';
import { glassPlace } from '../role_sets/glassPlace/glassPlace';
import Mug from '../role_sets/mugs/MugClass';
import WhiskeyGlass from '../role_sets/mugs/WhiskeyGlassClass';
import { fillingGlass } from '../role_sets/fillingGlass/fillingGlass';
import { setA } from './setA';
import { debugFlags, debugKeys } from '../../../debug/debug_flags';

const signalSet = new ActorsSet();

signalSet.name = 'signalSet';

export const dropPlaces = new ActorsSet([hookPlace, mugPlaces, pourOutArea, glassPlace, signalSet]);

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
            mug.dropDown();
          }
        } else if (percentOverlap(placeRect, mugRect) > 0.75) {
          switch (roleSet) {
            case mugPlaces:
              if (mug instanceof Mug) {
                const { faucet } = place;
                if (!faucet.state.placedMug) {
                  mug.setPositionXY(place.whereToPlaceMug());
                  mug.placedToBeFilled(faucet);
                }
              }
              break;

            case hookPlace:
              mug.carriedToCustomer();
              break;

            case glassPlace:
              if (mug instanceof WhiskeyGlass && fillingGlass.size === 0) {
                mug.setPositionXY(place.whereToPlaceMug());
                mug.placedToBeFilled();
              }
              break;

            default:
              break;
          }
        }
      } else if (
        roleSet === pourOutArea
        && !pouring
        && mug instanceof Mug
        && mug.state.total
        && percentOverlap(placeRect, mugRect) > 0.75
      ) {
        pouringMug.addElement(mug);
      }

      if (debugFlags[debugKeys.HIGHLIGHT_DROP_ZONES] && roleSet !== signalSet) {
        if (percentOverlap(placeRect, mugRect) > 0.75) {
          updateStyle(place.node, { 'background-color': 'rgba(255, 0, 0, 0.2)' });
        } else {
          updateStyle(place.node, { 'background-color': 'rgba(255, 255, 255, 0.2)' });
        }
      }
    },
  })
  .start();

export const highlightPlacesRole = new RoleClass(Symbol('highlightPlacesRole'))
  .registerAction(dropPlaces, {
    action({ target: place }) {
      if (place.highlight) {
        place.highlight(debugFlags[debugKeys.HIGHLIGHT_DROP_ZONES]);
      }
    },
  })
  .start();

setA.addElement(dropPlaces);
