/* eslint-env browser */
import { dragMug } from '../role_sets/dragMug/dragMug';
import { ActorsSet, registerActionOfType } from '../../../libs/actors_and_roles';
import { mugsOnLine } from '../role_sets/mugs/mugsOnLine/mugsOnLine';
import { fillingMugs } from '../role_sets/fillingMugs/fillingMugs';

// eslint-disable-next-line
export const mugs = new ActorsSet([mugsOnLine, fillingMugs]);

mugs.name = 'mugs';

registerActionOfType('mousedown', mugs, {
  action({ target: mug, event }) {
    event.preventDefault();
    dragMug.addElement(mug);
  },
}).start();
