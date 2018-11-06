/* eslint-env browser */
import stage from '../../../role_sets/stage/stage';
import { dragMug } from '../role_sets/dragMug';
import { ActorsSet, registerActionOfType } from '../../../libs/actors_and_roles';
import { mugsOnLine } from '../role_sets/mugsOnLine/mugsOnLine';
import { managePropagation } from '../../../libs/eventswork';

export const mugs = new ActorsSet([mugsOnLine]);

mugs.name = 'mugs';

export const startDrag = registerActionOfType('mousedown', mugs, {
  action({ target, unit, event }) {
    event.preventDefault();
    managePropagation(event, { stopBubbling: false });
    // const MugFilling = getUnit('MugFilling');
    // if (unit === MugFilling) {
    //   MugFilling.delete(target);
    //   target.faucet.placedMug = null;
    //   target.faucet = null;
    //   target.placed = false;
    // }
    target.attachClassName('dragMug');
    target.getAppendedAsChild(stage);
    dragMug.addElement(target);
  },
});
