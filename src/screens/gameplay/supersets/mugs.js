/* eslint-env browser */
import mousedown from '../../../role_classes/mousedown';
import stage from '../../../role_sets/stage/stage';
import { dragMug } from '../role_sets/dragMug';
import { attachClassName } from '../../../libs/helpers_lib';
import { ActorsSet } from '../../../libs/actors_and_roles';
import { mugsOnLine } from '../role_sets/mugsOnLine/mugsOnLine';

export const mugs = new ActorsSet([mugsOnLine]);

export const startDrag = mousedown.registerAction(mugs, {
  action({ target, unit, event }) {
    event.preventDefault();
    // const MugFilling = getUnit('MugFilling');
    // if (unit === MugFilling) {
    //   MugFilling.delete(target);
    //   target.faucet.placedMug = null;
    //   target.faucet = null;
    //   target.placed = false;
    // }
    attachClassName(target, 'dragMug');
    stage.appendAsChild(target);
    dragMug.addElement(target);
  },
});
