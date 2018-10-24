/* eslint-env browser */
import { ActorsSet } from '../actors_and_roles';

export const signalElementAmongMugs = Symbol('@@mugsOnLine/signalElementAmongMugs');
export const mugsOnLine = new ActorsSet([signalElementAmongMugs]);
