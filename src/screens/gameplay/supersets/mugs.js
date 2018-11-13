/* eslint-env browser */
import { dragMug } from '../role_sets/dragMug';
import { ActorsSet, registerActionOfType } from '../../../libs/actors_and_roles';
import { mugsOnLine } from '../role_sets/mugsOnLine/mugsOnLine';
import { managePropagation } from '../../../libs/eventswork';
import { fillingMugs } from '../role_sets/fillingMugs';

export const mugs = new ActorsSet([mugsOnLine, fillingMugs]);

mugs.name = 'mugs';

export const startDragRole = registerActionOfType('mousedown', mugs, {
  action({ target: mug, roleSet, event }) {
    event.preventDefault();
    managePropagation(event, { stopBubbling: false });
    if (roleSet === fillingMugs) {
      mug.fillingState.faucet.releaseMug();
      // mug.fillingState.faucet.state.placedMug = null;
      mug.fillingState.faucet = null;
      mug.fillingState.lastTime = null;
      mug.placed = false;
    }
    mug.attachClassName('dragMug');
    dragMug.addElement(mug);
  },
});
