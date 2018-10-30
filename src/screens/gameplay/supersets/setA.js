import { ActorsSet } from '../../../libs/actors_and_roles';
import { mugs } from './mugs';
import { dragMug } from '../role_sets/dragMug';
import bar from '../role_sets/bar';
import faucets from '../role_sets/faucets';

export const setA = new ActorsSet([mugs, dragMug, bar, faucets]);

export const setACleaner = setA.getCleaner();
export const setAInitializer = setA.getInitializer();
