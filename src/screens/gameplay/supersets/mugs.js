/* eslint-env browser */
import { dragMug } from '../role_sets/dragMug';
import { ActorsSet, registerActionOfType } from '../../../libs/actors_and_roles';
import { mugsOnLine } from '../role_sets/mugsOnLine/mugsOnLine';
import { managePropagation } from '../../../libs/eventswork';
import { fillingMugs } from '../role_sets/fillingMugs';

export const mugs = new ActorsSet([mugsOnLine, fillingMugs]);

mugs.name = 'mugs';

export const startDragRole = registerActionOfType('mousedown', mugs, {
  action({ target: mug, event }) {
    event.preventDefault();
    // managePropagation(event, { stopBubbling: false });
    dragMug.addElement(mug);
  },
});
