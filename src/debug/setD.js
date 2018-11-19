import infoSet from './displayInfo';
import { ActorsSet } from '../libs/actors_and_roles';
import { fpsSet } from './fps';

// eslint-disable-next-line
export const setD = new ActorsSet([infoSet, fpsSet]);

setD.name = 'setD';
