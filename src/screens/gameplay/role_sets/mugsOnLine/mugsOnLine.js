/* eslint-env browser */
import { ActorsSet } from '../../../../actors_and_roles';

export const signalElementAmongMugs = Symbol('@@mugsOnLine/signalElementAmongMugs');
const mugsOnLine = new ActorsSet();
mugsOnLine.getInitializer(function () {
  this.addElement(signalElementAmongMugs);
});

export { mugsOnLine };
