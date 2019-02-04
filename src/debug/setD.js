import { ActorsSet } from '../libs/actors_and_roles';
import { infoSet } from './displayInfo';
import { fpsSet } from './fpsInfo';

// eslint-disable-next-line
export const setD = new ActorsSet([infoSet, fpsSet]);

setD.name = 'setD';
