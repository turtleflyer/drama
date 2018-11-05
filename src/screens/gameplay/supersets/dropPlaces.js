/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import mugPlaces from '../role_sets/mugPlaces';
import hookPlace from '../role_sets/hookPlace';
import { checkEnter } from '../../../assets/role_classes';
import { percentOverlap, updateStyle } from '../../../libs/helpers_lib';

const signalElement = Symbol('@@dropPlaces/signalElement');

export const dropPlaces = new ActorsSet([mugPlaces, hookPlace, signalElement]);

export const dropMug = checkEnter.registerAction(dropPlaces, {
  action({ target, unit, event: { mug, tryToPlace } }) {
    // if (tryToPlace) {
    //   if (target === signalElement) {
    //     if (!mug.placed) {
    //       const FallenMug = getUnit('FallenMug');
    //       FallenMug.addElement(mug);
    //     }
    //   } else {
    //     const { scaleFactor } = commonParams;
    //     const placeRect = target.node.getBoundingClientRect();
    //     const mugRect = mug.img.getBoundingClientRect();
    //     const sceneRect = commonParams.scene.getBoundingClientRect();
    //     if (percentOverlap(placeRect, mugRect) > 0.75) {
    //       switch (unit.name) {
    //         case 'MugPlaces':
    //           {
    //             console.log('unit: ', unit);
    //             const { faucet } = target;
    //             if (!faucet.placedMug) {
    //               const MugFilling = getUnit('MugFilling');
    //               MugFilling.addElement(mug);
    //               mug.faucet = target.faucet;
    //               faucet.placedMug = mug;
    //               mug.setPosition({
    //                 top: null,
    //                 bottom: (sceneRect.bottom - placeRect.bottom + mugRect.height) / scaleFactor,
    //                 left:
    //                   (placeRect.left - sceneRect.left + (placeRect.width - mugRect.width) / 2)
    //                   / scaleFactor,
    //               });
    //               mug.placed = true;
    //             }
    //           }
    //           break;

    //         case 'HookPlace':
    //           {
    //             console.log('unit: ', unit);
    //             const MugWaiting = getUnit('MugWaiting');
    //             MugWaiting.addElement(mug);
    //             mug.setPosition({
    //               top: null,
    //               bottom:
    //                 (sceneRect.bottom
    //                   - placeRect.bottom
    //                   + (mugRect.height + placeRect.height / 4))
    //                 / scaleFactor,
    //               left: (mugRect.left - sceneRect.left) / scaleFactor,
    //             });
    //             mug.placed = true;
    //           }
    //           break;

    //         default:
    //           break;
    //       }
    //     }
    //   }
    // } else
    if (target !== signalElement) {
      const placeRect = target.node.getBoundingClientRect();
      const mugRect = mug.img.getBoundingClientRect();
      if (percentOverlap(placeRect, mugRect) > 0.75) {
        updateStyle(target.node, { 'background-color': 'rgba(255, 0, 0, 0.2)' });
      } else {
        updateStyle(target.node, { 'background-color': 'rgba(255, 255, 255, 0.2)' });
      }
    }
  },
});
