/* eslint-env browser */
import { dragMug } from '../role_sets/dragMug/dragMug';
import { ActorsSet, registerActionOfType } from '../../../libs/actors_and_roles';
import { mugsOnLine } from '../role_sets/mugs/mugsOnLine/mugsOnLine';
import { fillingMugs } from '../role_sets/fillingMugs/fillingMugs';
import { fillingGlass } from '../role_sets/fillingGlass/fillingGlass';
import { setA } from './setA';

// eslint-disable-next-line
export const mugs = new ActorsSet([mugsOnLine, fillingMugs, fillingGlass]);

mugs.name = 'mugs';

registerActionOfType('mousedown', mugs, {
  action({ target: mug, event }) {
    event.preventDefault();
    dragMug.addElement(mug);
  },
}).start();

setA.addElement(mugs);
