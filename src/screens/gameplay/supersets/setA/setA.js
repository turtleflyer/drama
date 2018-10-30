import { ActorsSet } from '../../../../actors_and_roles';
import mugs from '../mugs/mugs';
import dragMug from '../../role_sets/dragMug/dragMug';

export const setA = new ActorsSet([mugs, dragMug]);

export const setACleaner = setA.getCleaner();
export const setAInitializer = setA.getInitializer();
